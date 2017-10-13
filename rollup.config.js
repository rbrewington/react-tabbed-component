import babel from 'rollup-plugin-babel';

export default {
  input: 'src/index.js',
  external: ['react'],
  plugins: [babel({ exclude: 'node_modues/**' })],
  output: {
    file: 'dist/index.js',
    format: 'cjs',
    globals: { react: 'React' },
  },
};
