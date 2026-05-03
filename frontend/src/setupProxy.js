const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/incidents',
    createProxyMiddleware({
      target: 'http://backend:8000',
      changeOrigin: true,
    })
  );
  app.use(
    '/signals',
    createProxyMiddleware({
      target: 'http://backend:8000',
      changeOrigin: true,
    })
  );
  app.use(
    '/health',
    createProxyMiddleware({
      target: 'http://backend:8000',
      changeOrigin: true,
    })
  );
};
