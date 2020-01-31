const qs = require('qs');
const fetch = require('node-fetch');

module.exports = publicRouter => {

  publicRouter.get('/', (req, res, next) => {

    const authorization = Buffer.from('5d2lgnkg62tj9avn78j1bdu02d:99bjr2rcir4crs5quimjai65rn7114jdd3tqkicfgm37hbgfpt').toString('base64');

    const headers = {
      'Authorization': 'Basic ' + authorization,
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    const body = {
      grant_type: 'client_credentials',
      scope: 'transactions/post',
    };

    fetch('https://adscribe.auth.eu-west-1.amazoncognito.com/oauth2/token', {
      body: qs.stringify(body),
      headers,
      method: 'POST',
    }).then((res) => res.json())
      .then(resObj => {
        res.send({
          result: true,
          token: resObj.access_token,
        });
      })
      .catch(err => {
        console.log(err);
        debugger;
      });

  });


  return publicRouter;

};

