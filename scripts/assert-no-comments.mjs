import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, resolve, dirname, extname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const PROJECT_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const SCANNED_DIRECTORIES = [
  'app',
  'lib',
  'components',
  'scripts',
  'tests',
  'content',
  'messages',
  '.github',
];
const SCANNED_ROOT_FILES = [
  'next.config.ts',
  'proxy.ts',
  'postcss.config.mjs',
  'tsconfig.json',
  'package.json',
  'eslint.config.mjs',
  '.gitattributes',
];

const IGNORED_DIRECTORIES = new Set(['node_modules', '.next', '.git', 'dist', 'coverage']);
const SCANNED_EXTENSIONS = new Set(['.ts', '.tsx', '.mjs', '.js', '.jsx', '.css', '.json', '.yml', '.yaml']);

const TODO_MARKER = /\b(TODO|FIXME|HACK|XXX)\b/;

const findings = [];

function report(filePath, lineNumber, reason) {
  findings.push(`${relative(PROJECT_ROOT, filePath)}:${lineNumber}  ${reason}`);
}

function scanJsonForCommentKeys(filePath, content) {
  const lines = content.split('\n');
  lines.forEach((line, index) => {
    if (/"(_comment|\/\/|_note)"\s*:/.test(line)) {
      report(filePath, index + 1, 'clave de comentario en JSON');
    }
  });
}

function scanYamlForComments(filePath, content) {
  const lines = content.split('\n');
  lines.forEach((line, index) => {
    const withoutStrings = line.replace(/'[^']*'|"[^"]*"/g, '');
    if (/(^|\s)#/.test(withoutStrings)) {
      report(filePath, index + 1, 'comentario # en YAML');
    }
  });
}

function stripStringsAndRegexLiterals(line) {
  return line
    .replace(/'(?:\\.|[^'\\])*'/g, "''")
    .replace(/"(?:\\.|[^"\\])*"/g, '""')
    .replace(/`(?:\\.|[^`\\])*`/g, '``')
    .replace(/\/(?![/*])(?:\\.|\[(?:\\.|[^\]\\])*\]|[^/\\\n])+\/[gimsuy]*/g, '/RE/');
}

function scanCodeForComments(filePath, content) {
  const lines = content.split('\n');
  let insideBlockComment = false;

  lines.forEach((line, index) => {
    const lineNumber = index + 1;

    if (insideBlockComment) {
      report(filePath, lineNumber, 'continuacion de comentario de bloque');
      if (line.includes('*/')) insideBlockComment = false;
      return;
    }

    const sanitized = stripStringsAndRegexLiterals(line);

    if (sanitized.includes('//')) {
      report(filePath, lineNumber, 'comentario de linea //');
      return;
    }

    if (sanitized.includes('/*')) {
      report(filePath, lineNumber, 'comentario de bloque /*');
      if (!sanitized.includes('*/')) insideBlockComment = true;
      return;
    }

    if (TODO_MARKER.test(sanitized)) {
      report(filePath, lineNumber, 'marcador TODO/FIXME/HACK/XXX');
    }
  });
}

function scanCssForComments(filePath, content) {
  const lines = content.split('\n');
  lines.forEach((line, index) => {
    if (line.includes('/*')) report(filePath, index + 1, 'comentario de bloque en CSS');
  });
}

function scanFile(filePath) {
  const extension = extname(filePath);
  if (!SCANNED_EXTENSIONS.has(extension)) return;

  const content = readFileSync(filePath, 'utf8');

  if (extension === '.json') {
    scanJsonForCommentKeys(filePath, content);
    return;
  }

  if (extension === '.yml' || extension === '.yaml') {
    scanYamlForComments(filePath, content);
    return;
  }

  if (extension === '.css') {
    scanCssForComments(filePath, content);
    return;
  }

  scanCodeForComments(filePath, content);
}

function walk(directoryPath) {
  for (const entry of readdirSync(directoryPath)) {
    if (IGNORED_DIRECTORIES.has(entry)) continue;

    const entryPath = join(directoryPath, entry);
    if (statSync(entryPath).isDirectory()) {
      walk(entryPath);
    } else {
      scanFile(entryPath);
    }
  }
}

function assertNoComments() {
  for (const directory of SCANNED_DIRECTORIES) {
    const directoryPath = join(PROJECT_ROOT, directory);
    try {
      if (statSync(directoryPath).isDirectory()) walk(directoryPath);
    } catch {
      continue;
    }
  }

  for (const fileName of SCANNED_ROOT_FILES) {
    const filePath = join(PROJECT_ROOT, fileName);
    try {
      if (statSync(filePath).isFile()) scanFile(filePath);
    } catch {
      continue;
    }
  }

  if (findings.length > 0) {
    console.error(`\nSe encontraron ${findings.length} comentarios prohibidos:\n`);
    for (const finding of findings) console.error(`  ${finding}`);
    console.error('\nConvertir cada comentario en un nombre o en un test. No se permiten comentarios.');
    process.exit(1);
  }

  console.log('Cero comentarios: verificado en app, lib, components, scripts, tests, content y config.');
}

assertNoComments();
