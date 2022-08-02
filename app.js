const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = require('./routes');
const { errors } = require('celebrate');
const {
  createUser,
  login,
} = require('./controllers/users');


app.use(errors())
app.use(bodyParser.json());
app.post('/signup', createUser);
app.post('/signin', login);
app.use(router);


mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.listen(3000);
