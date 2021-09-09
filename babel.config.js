module.exports = {
  comments: false,
  presets: [
    ['@babel/preset-env'],
    ['@babel/preset-react'],
    ['@babel/preset-typescript'],
  ],
  plugins: [
    '@babel/plugin-syntax-dynamic-import',
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['@babel/plugin-proposal-nullish-coalescing-operator'],
    ['@babel/plugin-proposal-optional-chaining'],
  ],
  env: {
    node: {
      sourceMaps: 'both',
      sourceType: 'unambiguous',
      sourceFileName: 'index.js',
    },
  },
  ignore: ['node_modules'],
};
