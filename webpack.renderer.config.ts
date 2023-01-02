import type { Configuration } from 'webpack';

import { rules } from './webpack.rules';
import { plugins } from './webpack.plugins';

rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
});

rules.push({
  test: /\.s[ac]ss$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }, {
    loader: 'sass-loader', 
    options: {
      additionalData: '@import "src/ui/variables.scss";'
    },
  }],
});

export const rendererConfig: Configuration = {
  module: {
    rules,
  },
  //target: "electron-renderer",
  plugins,
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.sass'],
  },
};
