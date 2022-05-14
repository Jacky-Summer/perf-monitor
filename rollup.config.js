import babel from '@rollup/plugin-babel'
import typescript from 'rollup-plugin-typescript2'
import resolve from '@rollup/plugin-node-resolve'
import pkg from './package.json'

export default {
  input: 'src/index.ts',
  output: {
    name: 'perf-monitor',
    file: pkg.module,
    format: 'umd',
    sourcemap: true,
  },
  watch: {
    include: ['src/**', 'examples/**'],
  },
  plugins: [
    resolve({
      jsnext: true,
      preferBuiltins: true,
      browser: true,
    }),
    typescript({ useTsconfigDeclarationDir: true }),
    babel({
      exclude: ['examples/**'],
      presets: ['@babel/preset-env', '@babel/preset-typescript'],
      babelHelpers: 'bundled',
    }),
  ],
}
