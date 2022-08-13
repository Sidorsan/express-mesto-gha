const { VALIDATION_ERROR_CODE } = require('./errorsCode');

class ValidationErrorCode extends Error {
  constructor(message) {
    super(message);
    this.statusCode = VALIDATION_ERROR_CODE;
  }
}

module.exports = {
  ValidationErrorCode,
};
