const jwt = require('jsonwebtoken');
const { UnauthorizedErrorCode } = require('../errors/errors');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedErrorCode('Необходима авторизация');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    throw new UnauthorizedErrorCode('Необходима авторизация');
  }

  req.user = payload;

  next();
};
