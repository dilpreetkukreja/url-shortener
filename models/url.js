const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const urlSchema = new Schema({
  longUrl: {
    type: String,
  },
  urlCode: {
    type: String,
  },
  shortUrl: {
    type: String,
  },
});

module.exports = mongoose.model('Url', urlSchema);
