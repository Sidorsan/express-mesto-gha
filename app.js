const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = require('./routes');


app.use((req, res, next) => {
  req.user = {
    _id: '62d22caba78b332d70b5cc6d',
  };
  next();
});

app.use(bodyParser.json());
app.use(router);

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.listen(3000);
