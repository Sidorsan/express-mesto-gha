const router = require('express').Router();
const auth = require('../middlewares/auth');
const { celebrate, Joi } = require('celebrate');
const {
  getUsers,
  getUser,
  updateUser,
  updateUserAvatar,
  getCurrentUser,
  createUser,
  login,
} = require('../controllers/users');

router.post('/signin', login);
router.post(
  '/signup',
  celebrate({
    body: Joi.object()
      .keys({
        email: Joi.string().required().email(),
        password: Joi.string().required().min(2).max(30),
      })
      .keys({
        name: Joi.string().min(2).max(30),
        about: Joi.string().min(2).max(30),
      }).unknown(true),

  }),
  createUser
);

router.use(auth);

router.get('/users', getUsers);

router.patch(
  '/users/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
    }),
  }),
  updateUser
);

router.patch(
  '/users/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required().min(2).max(30),
    }),
  }),
  updateUserAvatar
);

router.get('/users/me', getCurrentUser);

router.get(
  '/users/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().alphanum().length(24),
    }),
  }),
  getUser
);
module.exports = router;
