const Url = require('../models/url');

exports.getLink = (req, res, next) => {
    console.log('here')
    const urlCode = req.params.code;
    console.log(urlCode);
    Url.findOne({
            urlCode: urlCode
        })
        .then((url) => {
            console.log(url);
            res.redirect(url.longUrl);
        })
        .catch((err) => console.log(err));
}