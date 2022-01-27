const express = require('express');
const next = require('next');
const { createProxyMiddleware } = require('http-proxy-middleware');
const bodyParser = require('body-parser');

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const API_URL = 'http://localhost:7000'

const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express();

  server.use(express.json({limit: '10mb'}));
  server.use(express.urlencoded({limit: '10mb'}));

  server.use(
    '/api',
    createProxyMiddleware({
      target: API_URL,
      changeOrigin: true
    })
  );

  server.all('*', (req, res) => {
    return handle(req, res)
  });

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  });
});