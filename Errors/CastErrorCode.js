const {CAST_ERROR_CODE}= require('./errors');
module.exports = class CastErrorCode extends Error {
  constructor(message) {
    super(message);
    this.statusCode = CAST_ERROR_CODE;
  }
}
