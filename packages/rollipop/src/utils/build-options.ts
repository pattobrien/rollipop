import path from 'node:path';

import { merge } from 'es-toolkit';

import type { ResolvedConfig } from '../config';
import type { BuildOptions } from '../core/types';

const DEFAULT_BUILD_OPTIONS: Partial<BuildOptions> = {
  cache: true,
  minify: false,
};

export function resolveBuildOptions(config: ResolvedConfig, buildOptions: BuildOptions) {
  if (buildOptions.outfile) {
    buildOptions.outfile = path.resolve(config.root, buildOptions.outfile);
  }

  if (
    (buildOptions.sourcemap === true || buildOptions.sourcemap === 'hidden') &&
    buildOptions.sourcemapOutfile
  ) {
    buildOptions.sourcemapOutfile = path.resolve(config.root, buildOptions.sourcemapOutfile);
  }

  return merge(DEFAULT_BUILD_OPTIONS, {
    ...buildOptions,
    dev: buildOptions.dev ?? config.mode === 'development',
  });
}

export type ResolvedBuildOptions = ReturnType<typeof resolveBuildOptions>;
