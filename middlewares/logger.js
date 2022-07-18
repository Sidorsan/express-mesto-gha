const logger = (req, res, next) => {
  req.user = {
    _id: "62d4fcfad898e23e40d6d323",
  };
  next();
};
module.exports = logger;
