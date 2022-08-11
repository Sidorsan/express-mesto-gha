const Card = require('../models/card');

const {
  CastErrorCode,
  ForbiddenErrorCode,
  NotFoundError,
  ValidationErrorCode,
} = require('../errors');

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
      if (req.user._id.toString() !== card.owner.toString()) {
        next(new ForbiddenErrorCode('Нельзя удалить карточку другого пользователя'));
        return;
      }
      Card.deleteOne(card).then(() => res.status(200).send(card));
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
