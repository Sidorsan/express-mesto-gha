const jwt = require('jsonwebtoken');
const JWT_SECRET = 'secret';
const User = require('../models/user');

module.exports.getJwtToken = (id) => {
  return jwt.sign({id}, JWT_SECRET);
};

// module.exports.isAuthorised = (token) => {
//   return jwt.verify(token, JWT_SECRET, (err, decoded) => {
//     if (err) return false
//     return User.findById(decoded.id)
//     .then((admin) => {
//       return Boolean(admin)
//     })
//   })
// }

module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res
      .status(401)
      .send({ message: 'Необходима авторизация' });
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res
      .status(401)
      .send({ message: 'Необходима авторизация' });
  }

  req.user = payload;
  next();
};

