const express = require('express');
const { errors } = require('celebrate');

const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = require('./routes');
const { errorHandler } = require('./middlewares/errorHandler');

app.use(bodyParser.json());
app.use(router);

app.use(errors());
app.use(errorHandler);
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.listen(3000);
