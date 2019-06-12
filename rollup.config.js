import pkg from './package.json';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';

const outputDir = 'lib';
const modules = ['dropdowns', 'index', 'modals', 'tabs'];
const external = [...Object.keys(pkg.peerDependencies || {})];
const plugins = [
  babel({ exclude: 'node_modules/**', babelrc: false, presets: [['@babel/preset-env', { modules: false }]] }),
  terser(),
];

export default [
  ...modules.map(name => ({
    input: `src/${name}.js`,
    output: {
      file: `${outputDir}/es/${name}.js`,
      format: 'es',
      indent: false,
    },
    external,
    plugins,
  })),
  ...modules.map(name => ({
    input: `src/${name}.js`,
    output: {
      file: `${outputDir}/${name}.js`,
      format: 'cjs',
      indent: false,
    },
    external,
    plugins,
  })),
];
