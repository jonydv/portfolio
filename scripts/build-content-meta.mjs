import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const PROJECT_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const CONTENT_DIR = join(PROJECT_ROOT, 'content');
const META_FILE = join(CONTENT_DIR, '_meta.json');

const META_FILE_NAME = '_meta.json';
const HASH_ALGORITHM = 'sha256';
const VERSION_PREFIX_LENGTH = 12;

function hashableContentFiles() {
  return readdirSync(CONTENT_DIR)
    .filter((fileName) => fileName.endsWith('.json') && fileName !== META_FILE_NAME)
    .sort();
}

function computeContentHash(fileNames) {
  const hash = createHash(HASH_ALGORITHM);

  for (const fileName of fileNames) {
    hash.update(fileName);
    hash.update(readFileSync(join(CONTENT_DIR, fileName)));
  }

  return hash.digest('hex');
}

function buildContentMeta() {
  const fileNames = hashableContentFiles();
  const contentHash = computeContentHash(fileNames);

  const meta = {
    version: contentHash.slice(0, VERSION_PREFIX_LENGTH),
    generatedAt: new Date().toISOString(),
    contentHash,
  };

  writeFileSync(META_FILE, `${JSON.stringify(meta, null, 2)}\n`, 'utf8');
  console.log(`content/_meta.json: version ${meta.version} sobre ${fileNames.length} archivos`);
}

buildContentMeta();
