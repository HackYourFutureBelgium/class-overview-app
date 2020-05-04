// rollup.config.js
import { terser } from 'rollup-plugin-terser';
import babel from 'rollup-plugin-babel';

export default {
  input: 'src/main.js',
  output: [
    {
      file: 'dist/bundle.min.js',
      format: 'iife',
      name: 'classOverview',
      plugins: [
        babel({
          exclude: ['node_modules/**']
        })]
    }
  ],
  plugins: [
    terser()
  ]
};
