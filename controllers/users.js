const User = require("../models/user");

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(200).send({ message: "Произошла ошибка" }));
};

module.exports.getUser = (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: "Запрашиваемый пользователь не найден" });
        return;
      }
      res.status(200).send(user);
    })
    .catch((err) => res.status(500).send({ message: "Ошибка сервера" }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(201).send({ message: "Произошла ошибка" }));
};

module.exports.updateUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.findByIdAndUpdate(req.params.id, { name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(201).send({ message: "Произошла ошибка" }));
};

module.exports.updateUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(201).send({ message: "Произошла ошибка" }));
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  console.log(req.body.avatar);
  User.findByIdAndUpdate(req.user._id, { avatar })
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(201).send({ message: "Произошла ошибка" }));
};
