
const router = require('express').Router();
const {auth} = require('../middlewares/auth');


const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateUserAvatar,
  login,
} = require('../controllers/users');


router.post('/signup', createUser);
router.post('/signin', login);

router.use(auth)

router.get('/users', getUsers);
router.get('/users/:id', getUser);
router.patch('/users/me', updateUser);
router.patch('/users/me/avatar', updateUserAvatar);

module.exports = router;
