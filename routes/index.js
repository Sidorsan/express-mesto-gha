
const router = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./cards');
const {NotFoundError}  = require('../error');

//  const  {NOT_FOUND_ERROR_CODE}  = require('../error');
console.log(NotFoundError);
router.use(userRouter);
router.use(cardRouter);
router.use((req, res) => {
  // res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Wrong URL' });
  throw new NotFoundError('Wrong URL');
})

module.exports = router;
