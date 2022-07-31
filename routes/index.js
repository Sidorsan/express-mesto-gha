const router = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./cards');

const { NOT_FOUND_ERROR_CODE } = require('../errors');

router.use(userRouter);
router.use(cardRouter);
router.use((req, res) => {
  res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Wrong URL' });
});

module.exports = router;
