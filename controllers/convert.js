const shortid = require('shortid');
var validUrl = require('valid-url');
const Url = require('../models/url');

exports.postConvert = (req, res, next) => {
  const baseUrl = 'https://url-shortener-nodejs-mongoose.herokuapp.com/';
  const longUrl = req.body.longUrl;
  //create url code
  const urlCode = shortid.generate();
  const shortUrl = baseUrl + urlCode;

  console.log(longUrl);
  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).send('<h1>Invalid Base Url</h1>');
  }
  if (!validUrl.isUri(longUrl)) {
    return res.status(401).send('<h1>Invalid Long Url</h1>');
  }
  Url.findOne({
    longUrl: longUrl,
  }).then((url) => {
    if (!url) {
      const url = new Url({
        longUrl,
        urlCode,
        shortUrl,
      });
      url
        .save()
        .then(() => {
          res.render('inputForm', {
            shortUrl: shortUrl,
          });
        })
        .catch((err) => console.log(err));
    } else {
      res.render('inputForm', {
        shortUrl: url.shortUrl,
      });
    }
  });
};
