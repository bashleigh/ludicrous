import { defineConfig } from 'tsup'
import fs from 'fs'

const pkgJson = JSON.parse(fs.readFileSync('package.json', 'utf-8'))

export default defineConfig({
  entry: ['src/index.ts'],
  target: 'node16',
  minify: true,
  clean: true,
  dts: true,
  treeshake: true,
  esbuildOptions: (opts) => {
    opts.resolveExtensions = ['.ts', '.mjs', '.js']
  },
  noExternal: pkgJson.dependencies ? Object.keys(pkgJson?.dependencies) : undefined,
})
