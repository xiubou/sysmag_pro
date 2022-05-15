const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/ajax',
    createProxyMiddleware({
      target: 'https://m.maoyan.com',
      changeOrigin: true,
    })
  );
//   app.use(  // 可配置多个代理路径
//     '/ajax22',
//     createProxyMiddleware({
//       target: 'https://m22.maoyan.com',
//       changeOrigin: true,
//     })
//   );
};