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

/*app.get('/!*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/dist/${nomeApp}/index.html`));
});*/

app.get('/*', (req, res, next) => {
  console.log('1');
  if (req.get('X-Forwarded-Proto')==='https' || req.hostname === 'localhost') {
    //Serve Angular App by passing control to the next middleware
    console.log('2');
    res.sendFile(path.join(`${__dirname}/dist/${nomeApp}/index.html`));
    next();
  } else if(req.get('X-Forwarded-Proto')!=='https' && req.get('X-Forwarded-Port')!=='443'){
    console.log('3');
    //Redirect if not HTTP with original request URL
    res.redirect('https://' + req.hostname + req.url);
  }

});

app.listen(process.env.PORT || 8080);
