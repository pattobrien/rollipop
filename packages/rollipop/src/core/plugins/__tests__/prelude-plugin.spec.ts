import path from 'node:path';

import { interpreter } from '@rollipop/rolldown/filter';
import { describe, expect, it, vi } from 'vite-plus/test';

import { prelude } from '../prelude-plugin';

describe('prelude plugin', () => {
  it('does not install when no prelude module is configured', () => {
    const plugin = prelude({ entryPath: '/project/index.js', modulePaths: [] });

    expect(plugin).toBeNull();
  });

  it('runs transform only for the configured entry path', () => {
    const entryPath = path.join('/project', 'index.js');
    const plugin = prelude({
      entryPath,
      modulePaths: [path.join('/project', 'prelude.js')],
    })!;
    const transform = plugin.transform as {
      filter: Parameters<typeof interpreter>[0];
    };

    expect(interpreter(transform.filter, undefined, entryPath)).toBe(true);
    expect(interpreter(transform.filter, undefined, path.join('/project', 'App.tsx'))).toBe(false);
  });

  it('prepends prelude imports with native magic string', () => {
    const entryPath = path.join('/project', 'index.js');
    const preludePath = path.join('/project', 'prelude.js');
    const plugin = prelude({ entryPath, modulePaths: [preludePath] })!;
    const transform = plugin.transform as {
      handler: (
        code: string,
        id: string,
        meta: { magicString?: { prepend: (value: string) => void } },
      ) => { code: unknown } | string | undefined;
    };
    const magicString = { prepend: vi.fn() };

    const result = transform.handler('console.log("entry");', entryPath, { magicString });

    expect(magicString.prepend).toHaveBeenCalledWith(`import '${preludePath}';\n`);
    expect(result).toEqual({ code: magicString });
  });

  it('throws when native magic string is unavailable', () => {
    const entryPath = path.join('/project', 'index.js');
    const preludePath = path.join('/project', 'prelude.js');
    const plugin = prelude({ entryPath, modulePaths: [preludePath] })!;
    const transform = plugin.transform as {
      handler: (
        code: string,
        id: string,
        meta: { magicString?: { prepend: (value: string) => void } },
      ) => { code: unknown } | string | undefined;
    };

    expect(() => transform.handler('console.log("entry");', entryPath, {})).toThrow(
      'magicString not found',
    );
  });
});
