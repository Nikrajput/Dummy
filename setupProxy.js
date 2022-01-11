const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://befinsavvy-emailapi.herokuapp.com:21546',
      changeOrigin: true,
    })
  );
};