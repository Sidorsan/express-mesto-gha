const express = require('express');
const { errors } = require('celebrate');

const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = require('./routes');

app.use(bodyParser.json());
app.use(router);

app.use(errors());
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
  });
  next();
});
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.listen(3000);
