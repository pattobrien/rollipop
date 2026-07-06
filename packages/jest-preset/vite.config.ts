import { defineConfig } from 'vite-plus';

export default defineConfig({
  pack: {
    entry: ['src/index.ts', 'src/transformer.ts', 'src/mock.ts'],
    outDir: 'dist',
    format: 'cjs',
    platform: 'node',
    fixedExtension: false,
    dts: true,
  },
});
