const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = require('./routes');
// const router = require('express').Router();
const { errors } = require('celebrate');
// const {createUser, login} = require('./controllers/users');
// console.log(createUser);
// const errorHandler = require('./middlewares/errorHandler')

app.use(bodyParser.json());
app.use(router);
// router.post('/signup', createUser);
// router.post('/signin', login);

app.use(errors());
app.use((err, req, res, next) => {
// //   // console.log(err.code);
// //   // if (err.name === 'CastError') {
// //   //   return res.status(400).send({ message: 'Некорректный ID' });
// //   // }
// //   //   if (err.code === 11000) {
// //   //     return res.status(409).send({ message: 'Такой пользователь уже существует' }); // Обработка ошибки
// //   // }
// //   // if (err.name === 'ValidationError') {
// //   //   return res.status(400).send({ message: err.message });
// //   // }
// //   // res.status(err.statusCode).send({ message: err.message });
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
  });
  next();
});
// app.use (errorHandler)
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.listen(3000);
