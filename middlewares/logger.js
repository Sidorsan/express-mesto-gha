const logger = (req, res, next) => {
  req.user = {
    _id: "62d35bf9db7e830294b99841",
  };
  next();
};
module.exports = logger;
