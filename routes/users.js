const router = require('express').Router();
const auth = require('../middlewares/auth');

const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateUserAvatar,
  login,
  getCurrentUser,
} = require('../controllers/users');

router.use(auth);

router.get('/users', getUsers);
// router.get('/users/:id', getUser);
router.patch('/users/me', updateUser);
router.patch('/users/me/avatar', updateUserAvatar);
router.get('/users/me', getCurrentUser);

module.exports = router;
