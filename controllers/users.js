const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const {
  CastErrorCode,
  ConflictErrorCode,
  NotFoundError,
  UnauthorizedErrorCode,
  ValidationErrorCode,
} = require('../error');

const SALT_ROUNDS = 10;

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        next(new NotFoundError('Нет пользователя с таким id'));
        return;
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new CastErrorCode('Некорректный ID'));
        return;
      }
      next();
    });
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      res.status(200).send(user);
    })
    .catch(next);
};

module.exports.createUser = (err, req, res, next) => {
  const {
    email, password, name, about, avatar,
  } = req.body;

  if (!email || !password) {
    next(new ValidationErrorCode(err.message));
    return;
  }
  User.findOne({ email }).then((user) => {
    if (user) {
      next(new ConflictErrorCode('Такой пользователь уже существует'));
    }
  });
  bcrypt.hash(password, SALT_ROUNDS).then((hash) => {
    User.create({
      email, password: hash, name, about, avatar,
    })
      .then((userData) => res.status(201).send({
        email: userData.email,
        id: userData._id,
        name: userData.name,
        about: userData.about,
        avatar: userData.avatar,
      }))
      .catch(() => next);
  });
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        next(new NotFoundError('Нет пользователя с таким id'));
        return;
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationErrorCode(err.message));
        return;
      }
      if (err.name === 'CastError') {
        next(new CastErrorCode('Некорректный ID'));
        return;
      }
      next();
    });
};

module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        next(new NotFoundError('Нет пользователя с таким id'));
        return;
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationErrorCode(err.message));
        return;
      }
      if (err.name === 'CastError') {
        next(new CastErrorCode('Некорректный ID'));
        return;
      }
      next();
    });
};

module.exports.login = (err, req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    next(new ValidationErrorCode(err.message));
    return;
  }
  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        next(new UnauthorizedErrorCode('Такого пользователя не существует'));
        return;
      }
      bcrypt.compare(password, user.password, (isValidPassword) => {
        if (!isValidPassword) {
          next(new UnauthorizedErrorCode('Пароль не верный'));
          return;
        }

        const tok = jwt.sign({ _id: user._id }, 'some-secret-key', {
          expiresIn: '7d',
        });
        res.status(200).send({ token: tok });
      });
    })

    .catch(next);
};
