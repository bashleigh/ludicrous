import { defineConfig } from 'tsup'
import fs from 'fs'

const pkgJson = JSON.parse(fs.readFileSync('package.json', 'utf-8'))

export default defineConfig({
  entry: ['src/index.ts'],
  target: 'node16',
  minify: true,
  treeshake: true,
  clean: true,
  dts: true,
  esbuildOptions: (opts) => {
    opts.resolveExtensions = ['.ts', '.mjs', '.js']
  },
  noExternal: Object.keys(pkgJson.dependencies),
})
