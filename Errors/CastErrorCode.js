const {CAST_ERROR_CODE} = require('../error');
console.log(CAST_ERROR_CODE);
 class CastErrorCode extends Error {
  constructor(message) {
    super(message);
    this.statusCode = CAST_ERROR_CODE;
  }
}
module.exports = CastErrorCode