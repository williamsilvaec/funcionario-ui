const express = require('express');
const path = require('path');
const nomeApp = process.env.npm_package_name;
const app = express();

app.set('forceSSLOptions', {
  enable301Redirects: true,
  trustXFPHeader: false,
  httpsPort: 443,
  sslRequiredMessage: 'SSL Required.'
});

app.use(express.static(`${__dirname}/dist/${nomeApp}`));
app.get('/*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/dist/${nomeApp}/index.html`));
});

app.listen(process.env.PORT || 8080);
