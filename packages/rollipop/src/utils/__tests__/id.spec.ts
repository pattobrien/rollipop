import { describe, it, expect } from 'vite-plus/test';

import { createTestConfig } from '../../testing/config';
import { createId } from '../id';
import type { ResolvedBuildOptions } from '../build-options';

describe('createId', () => {
  const BUILD_OPTIONS: ResolvedBuildOptions = {
    platform: 'ios',
    dev: true,
    minify: false,
    cache: false,
  };

  it('should return the same id', () => {
    const configA = createTestConfig('/root');
    const configB = createTestConfig('/root');

    configA.plugins = [{ name: 'plugin-a' }, { name: 'plugin-b' }];
    configB.plugins = [{ name: 'plugin-a' }, { name: 'plugin-b' }];

    const idA = createId(configA, BUILD_OPTIONS);
    const idB = createId(configB, BUILD_OPTIONS);

    expect(idA === idB).toBe(true);
  });

  it('should return different id', () => {
    const configA = createTestConfig('/root');
    const configB = createTestConfig('/root');
    const configC = createTestConfig('/root');

    configA.plugins = [{ name: 'plugin-a' }, { name: 'plugin-b' }];
    configB.plugins = [{ name: 'plugin-b' }, { name: 'plugin-a' }]; // different order
    configB.transformer.define = { __DEV__: 'false' }; // different value

    const idA = createId(configA, BUILD_OPTIONS);
    const idB = createId(configB, BUILD_OPTIONS);
    const idC = createId(configC, BUILD_OPTIONS);

    expect(idA === idB).toBe(false);
    expect(idA === idC).toBe(false);
    expect([idA, idB, idC]).toMatchInlineSnapshot(`
      [
        "3b4579b097c7c28be527d60715511a9a",
        "05ccf09c99152531da3b1cb00809f7f5",
        "1236ec91ae9b57f0f3e59b46a5ef5fbf",
      ]
    `);
  });
});
