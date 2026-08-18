import 'server-only';

export class ContentValidationError extends Error {
  readonly collection: string;
  readonly issues: string[];

  constructor(collection: string, issues: string[]) {
    super(`Contenido invalido en "${collection}":\n  ${issues.join('\n  ')}`);
    this.name = 'ContentValidationError';
    this.collection = collection;
    this.issues = issues;
  }
}

export class MissingMediaError extends Error {
  readonly assetPath: string;

  constructor(assetPath: string) {
    super(`El asset "${assetPath}" no esta en content/_media.json. Ejecutar npm run media:build.`);
    this.name = 'MissingMediaError';
    this.assetPath = assetPath;
  }
}
