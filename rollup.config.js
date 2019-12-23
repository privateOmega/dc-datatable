import resolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

import * as meta from './package.json';

export default {
  input: 'src/index.js',
  external: ['dc', 'simple-datatables'],
  plugins: [
    resolve({ browser: true }),
    json({ include: 'package.json', preferConst: true }),
    commonjs(),
    terser(),
  ],

  output: [
    // ES module version, for modern browsers
    {
      dir: 'dist/module',
      format: 'es',
      sourcemap: true,
      banner: `// ${meta.homepage} v${meta.version} Copyright ${new Date().getFullYear()} ${
        meta.author
      }`,
    },
    // SystemJS version, for older browsers
    {
      dir: 'dist/nomodule',
      format: 'system',
      sourcemap: true,
      banner: `// ${meta.homepage} v${meta.version} Copyright ${new Date().getFullYear()} ${
        meta.author
      }`,
    },
    // CJS version
    {
      dir: 'dist',
      format: 'cjs',
      sourcemap: true,
      banner: `// ${meta.homepage} v${meta.version} Copyright ${new Date().getFullYear()} ${
        meta.author
      }`,
    },
  ],
};
