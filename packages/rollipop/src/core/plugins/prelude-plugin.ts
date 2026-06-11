import * as rolldown from '@rollipop/rolldown';
import { id, include } from '@rollipop/rolldown/filter';
import { invariant } from 'es-toolkit';

export interface PreludePluginOptions {
  entryPath: string;
  modulePaths: string[];
}

function preludePlugin(options: PreludePluginOptions): rolldown.Plugin | null {
  const { entryPath, modulePaths } = options;

  if (modulePaths.length === 0) {
    return null;
  }

  const importStatements = modulePaths.map((modulePath) => `import '${modulePath}';`).join('\n');

  return {
    name: 'rollipop:prelude',
    transform: {
      order: 'pre',
      filter: [include(id(entryPath))],
      handler(_code, _id, meta) {
        const { magicString } = meta;
        invariant(magicString, 'magicString not found');

        magicString.prepend(`${importStatements}\n`);

        return { code: magicString };
      },
    },
  };
}

export { preludePlugin as prelude };
