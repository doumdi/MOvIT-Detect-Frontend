const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config.production');

const port = process.env.PORT || 3000;

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: false,
  historyApiFallback: true,
  compress: true,
  disableHostCheck: true,
}).listen(port, '0.0.0.0', (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Listening at localhost:${port}`);
});
