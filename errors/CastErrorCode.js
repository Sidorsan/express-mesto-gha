const { CAST_ERROR_CODE } = require('./errorsCode');

class CastErrorCode extends Error {
  constructor(message) {
    super(message);
    this.statusCode = CAST_ERROR_CODE;
  }
}

module.exports = {
  CastErrorCode,
};
