const Card = require('../models/card');

// const CastErrorCode = require('../errors/CastErrorCode');
// const ForbiddenErrorCode = require('../errors/ForbiddenErrorCode');
// const NotFoundError = require('../errors/NotFoundError');
// const ValidationErrorCode = require('../errors/ValidationErrorCode');
const {
  CastErrorCode,
  ConflictErrorCode,
  ForbiddenErrorCode,
  NotFoundError,
  UnauthorizedErrorCode,
  ValidationErrorCode,
} = require('../error');
// const {
//   SERVER_ERROR_CODE,
//   VALIDATION_ERROR_CODE,
//   CAST_ERROR_CODE,
//   NOT_FOUND_ERROR_CODE,
//   FORBIDDEN_ERROR_CODE,
// } = require('../errors/errors');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {

  const { name, link } = req.body;

  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        console.log(err.message);
        next(new ValidationErrorCode(err.message));
        return;
      }
      next();
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.id)
    .then((card) => {
      if (!card) {
        next(new NotFoundError('Карточка не найдена'));
        return;
      }
      if (req.user._id != card.owner) {
        next(
          new ForbiddenErrorCode('Нельзя удалить карточку другого пользователя')
        );
        return;
      }
      return Card.deleteOne(card).then(() => res.status(200).send(card));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new CastErrorCode('Некорректный ID'));
        return;
      }
      next();
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true },

  )
    .then((card) => {
      if (!card) {
        next(new NotFoundError('Карточка не найдена'));
        return;
      }
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new CastErrorCode('Некорректный ID'));
        return;
      }
      next();
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        next(new NotFoundError('Карточка не найдена'));
        return;
      }
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new CastErrorCode('Некорректный ID'));
        return;
      }
      next();
    });
};
