import {CleanWebpackPlugin} from 'clean-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'

export default
{
  entry: './src/index.tsx',
  module:
  {
    rules:
    [
      {
        use: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: ["ts-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|ico)$/i,
        use:
        [
          {
            loader: 'file-loader',
            options:
            {
              name: '[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins:
  [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin
    (
      {
        template:'./src/public/index.html'
      }
    )
  ]
}