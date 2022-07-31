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

// module.exports = (req, res, next) => {
//   const { authorization } = req.headers;

//   if (!authorization || !authorization.startsWith('Bearer ')) {
//     return res
//       .status(401)
//       .send({ message: 'Необходима авторизация1' });
//   }

//   const token = authorization.replace('Bearer ', '');
//   let payload;

//   try {
//     payload = jwt.verify(token, 'some-secret-key');
//   } catch (err) {
//     return res
//       .status(401)
//       .send({ message: 'Необходима авторизация2' });
//   }

//   req.user = payload; // записываем пейлоуд в объект запроса

//   next(); // пропускаем запрос дальше
// };

