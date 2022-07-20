const User = require('../models/user');

const checkUserId = (user, res) => {
  if (!user) {
    res.status(404).send({ message: 'Запрашиваемый пользователь не найден' });
    return;
  }
  res.status(200).send(user);
};

const defaultError = (res) => {
  res.status(500).send({ message: 'Произошла ошибка' });
};

const validationAndDefaultErrors = (err, res) => {
  if (err.name === 'ValidationError') {
    return res.status(400).send({ message: err.message });
  }
  return res.status(500).send({ message: 'Произошла ошибка' });
};

const castAndDefaultErrors = (err, res) => {
  if (err.name === 'CastError') {
    return res.status(400).send({ message: 'Некорректный ID' });
  }
  return res.status(500).send({ message: 'Произошла ошибка' });
};

const validationAndCastAndDefaultErrors = (err, res) => {
  if (err.name === 'ValidationError') {
    return res.status(400).send({ message: err.message });
  }
  if (err.name === 'CastError') {
    return res.status(400).send({ message: 'Некорректный ID' });
  }
  return res.status(500).send({ message: 'Произошла ошибка' });
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => defaultError(res));
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => checkUserId(user, res))
    .catch((err) => castAndDefaultErrors(err, res));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => validationAndDefaultErrors(err, res));
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => checkUserId(user, res))
    .catch((err) => validationAndCastAndDefaultErrors(err, res));
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((user) => checkUserId(user, res))
    .catch((err) => validationAndCastAndDefaultErrors(err, res));
};
