const {VALIDATION_ERROR_CODE}= require('./errors');
module.exports = class ValidationErrorCode extends Error {
  constructor(message) {
    super(message);
    this.statusCode = VALIDATION_ERROR_CODE;
  }
}
