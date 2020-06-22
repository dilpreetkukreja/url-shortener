const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const errorController = require('./controllers/error');
const convertController = require('./controllers/convert');
const getLinkController = require('./controllers/getLink');
const indexController = require('./controllers/index');
const app = express();
const mongoose = require('mongoose');

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', indexController.index);

app.post('/convert', convertController.postConvert);

app.get('/:code', getLinkController.getLink);

app.use(errorController.get404);

const PORT = process.env.PORT || 4000;

const MONGODB_URL = `mongodb+srv://${process.env.MONGO_USER}:${process.env.PASSWORD}@cluster0-hteme.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`;
mongoose
  .connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Database connected!');
    app.listen(PORT);
  })
  .catch((err) => console.log(err));
