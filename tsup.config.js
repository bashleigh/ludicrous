import { defineConfig } from 'tsup';
import fs from 'fs';

const pkgJson = JSON.parse(fs.readFileSync('package.json', 'utf-8'))

export default defineConfig({
  entry: ['src/index.ts'],
  target: 'node16',
  clean: true,
  minify: process.env.NODE_ENV === 'production',
  esbuildOptions: (opts) => {
    opts.resolveExtensions = ['.ts', '.mjs', '.js'];
  },
  noExternal: Object.keys(pkgJson.dependencies),
})
