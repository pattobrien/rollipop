export type GlobImportPattern = string | string[];
export type GlobImportOptions = Record<string, unknown>;
export type GlobImportResult = Record<string, unknown>;

export interface GlobImportContext {
  importer: string;
  pattern: GlobImportPattern;
  options?: GlobImportOptions;
}

export type GlobImportMock = (context: GlobImportContext) => GlobImportResult;

let globImportMock: GlobImportMock | undefined;

export function createGlobImport(importer: string) {
  return function globImport(
    pattern: GlobImportPattern,
    options?: GlobImportOptions,
  ): GlobImportResult {
    if (globImportMock == null) {
      throw new Error(
        [
          '@rollipop/jest-preset: Glob import is a bundler-only feature.',
          `Importer: ${importer}`,
          `Pattern: ${formatValue(pattern)}`,
          '',
          'Mock it in Jest with `mockGlobImport()` from "@rollipop/jest-preset/mock".',
        ].join('\n'),
      );
    }

    return globImportMock({ importer, pattern, options });
  };
}

export function mockGlobImport(implementation: GlobImportMock) {
  globImportMock = implementation;
}

export function resetGlobImport() {
  globImportMock = undefined;
}

export function resetRollipopJestPresetMocks() {
  resetGlobImport();
}

function formatValue(value: unknown) {
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}
