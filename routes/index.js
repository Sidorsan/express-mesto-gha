const router = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./cards');
const { NotFoundError } = require('../error');

router.use(userRouter);
router.use(cardRouter);
router.use(() => {
  throw new NotFoundError('Wrong URL');
});

module.exports = router;
