const jwt = require('jsonwebtoken');
const { UnauthorizedErrorCode } = require('../errors/UnauthorizedErrorCode');

const { JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedErrorCode('Необходима авторизация');
  }
  const token = authorization.replace('Bearer ', JWT_SECRET);
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new UnauthorizedErrorCode('Необходима авторизация');
  }

  req.user = payload;

  next();
};
