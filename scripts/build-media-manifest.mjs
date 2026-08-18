import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, resolve, dirname, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const PROJECT_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC_ROOT = join(PROJECT_ROOT, 'public');
const MANIFEST_FILE = join(PROJECT_ROOT, 'content', '_media.json');

const RASTER_EXTENSIONS = new Set(['.webp', '.png', '.jpg', '.jpeg', '.avif']);
const VECTOR_EXTENSIONS = new Set(['.svg']);
const BLUR_PLACEHOLDER_WIDTH = 12;

function collectImagePaths(directoryPath, collected = []) {
  for (const entry of readdirSync(directoryPath)) {
    const entryPath = join(directoryPath, entry);

    if (statSync(entryPath).isDirectory()) {
      collectImagePaths(entryPath, collected);
      continue;
    }

    const extension = extname(entry).toLowerCase();
    if (RASTER_EXTENSIONS.has(extension) || VECTOR_EXTENSIONS.has(extension)) {
      collected.push(entryPath);
    }
  }

  return collected;
}

function toPublicPath(absolutePath) {
  return absolutePath.slice(PUBLIC_ROOT.length).split('\\').join('/');
}

async function describeImage(absolutePath) {
  const bytes = readFileSync(absolutePath);
  const metadata = await sharp(bytes).metadata();

  const entry = {
    width: metadata.width,
    height: metadata.height,
    bytes: bytes.length,
  };

  if (VECTOR_EXTENSIONS.has(extname(absolutePath).toLowerCase())) {
    return entry;
  }

  const blurBuffer = await sharp(bytes)
    .resize({ width: BLUR_PLACEHOLDER_WIDTH })
    .webp({ quality: 40 })
    .toBuffer();

  return { ...entry, blurDataURL: `data:image/webp;base64,${blurBuffer.toString('base64')}` };
}

async function buildManifest() {
  const imagePaths = collectImagePaths(PUBLIC_ROOT).sort();
  const manifest = {};

  for (const absolutePath of imagePaths) {
    manifest[toPublicPath(absolutePath)] = await describeImage(absolutePath);
  }

  writeFileSync(MANIFEST_FILE, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');

  const totalBytes = Object.values(manifest).reduce((sum, entry) => sum + entry.bytes, 0);
  console.log(`content/_media.json: ${imagePaths.length} imagenes, ${Math.round(totalBytes / 1024)} KB en total`);
}

await buildManifest();
