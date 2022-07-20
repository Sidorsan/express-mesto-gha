const Card = require('../models/card');

const {
  SERVER_ERROR_CODE,
  VALIDATION_ERROR_CODE,
  CAST_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
} = require('../errors');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(() => {
      res.status(SERVER_ERROR_CODE).send({ message: 'Произошла ошибка' });
    });
};
module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(VALIDATION_ERROR_CODE).send({ message: err.message });
      }
      return res
        .status(SERVER_ERROR_CODE)
        .send({ message: 'Произошла ошибка' });
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then((card) => {
      if (!card) {
        res
          .status(NOT_FOUND_ERROR_CODE)
          .send({ message: 'Карточка не найдена' });
        return;
      }
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(CAST_ERROR_CODE).send({ message: 'Некорректный ID' });
      }
      return res
        .status(SERVER_ERROR_CODE)
        .send({ message: 'Произошла ошибка' });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res
          .status(NOT_FOUND_ERROR_CODE)
          .send({ message: 'Карточка не найдена' });
        return;
      }
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(CAST_ERROR_CODE).send({ message: 'Некорректный ID' });
      }
      return res
        .status(SERVER_ERROR_CODE)
        .send({ message: 'Произошла ошибка' });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res
          .status(NOT_FOUND_ERROR_CODE)
          .send({ message: 'Карточка не найдена' });
        return;
      }
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(CAST_ERROR_CODE).send({ message: 'Некорректный ID' });
      }
      return res
        .status(SERVER_ERROR_CODE)
        .send({ message: 'Произошла ошибка' });
    });
};
