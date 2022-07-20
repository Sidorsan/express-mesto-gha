const Card = require('../models/card');

const checkCardId = (card, res) => {
  if (!card) {
    res.status(404).send({ message: 'Карточка не найдена' });
    return;
  }
  res.status(200).send(card);
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

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(() => defaultError(res));
};
module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => validationAndDefaultErrors(err, res));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then((card) => checkCardId(card, res))
    .catch((err) => castAndDefaultErrors(err, res));
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => checkCardId(card, res))
    .catch((err) => castAndDefaultErrors(err, res));
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => checkCardId(card, res))
    .catch((err) => castAndDefaultErrors(err, res));
};
