const PROXY_CONFIG = [
  {
    context: ['/api/*'],
    target: 'http://localhost:3333/api',
    secure: false,
    logLevel: 'debug',
  },
];
module.exports = PROXY_CONFIG;
