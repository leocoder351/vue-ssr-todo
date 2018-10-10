const path = require('path');
const fs = require('fs');
const Router = require('koa-router');
const axios = require('axios');
const webpack = require('webpack');
const MemoryFS = require('memory-fs');    // 文件读写在内存中处理
const VueServerRenderer = require('vue-server-renderer');

const serverRender = require('./server-render');
const serverConfig = require('../../build/webpack.config.server');

const serverCompiler = webpack(serverConfig);
const mfs = new MemoryFS();
serverCompiler.outputFileSystem = mfs;

let bundle;

serverCompiler.watch({}, (err, stats) => {
  if (err) throw err;
  stats = stats.toJson();
  stats.errors.forEach(err => console.log(err));
  stats.warnings.forEach(warn => console.warn(warn));

  const bundlePath = path.resolve(serverConfig.output.path, 'vue-ssr-server-bundle.json');
  bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'));

  console.log('new bundle generated');
});

const handleSSR = async (ctx) => {
  if (!bundle) {
    ctx.body = 'wait a moment....';
    return ;
  }

  const clientManifestResp = await axios.get('http://localhost:8000/dist/vue-ssr-client-manifest.json')
  const clientManifest = clientManifestResp.data;

  const template = fs.readFileSync(path.resolve(__dirname, '../server.template.ejs'), 'utf-8');

  const renderer = VueServerRenderer.createBundleRenderer(bundle, {
    inject: false
  });

  await serverRender(ctx, renderer, template);
};

console.log(222);
console.log(handleSSR)

const router = new Router();
router.get('*', handleSSR);

module.exports = router;
