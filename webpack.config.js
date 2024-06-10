const path = require('path');

module.exports = {
  // Other configurations...
  module: {
    rules: [
      {
        test: /\.geojson$/,
        loader: 'json-loader',
      }
    ]
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.geojson'],
  },
};
