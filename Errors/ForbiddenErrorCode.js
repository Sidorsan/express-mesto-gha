const {FORBIDDEN_ERROR_CODE }= require('./errors');
module.exports = class ForbiddenErrorCode extends Error {
  constructor(message) {
    super(message);
    this.statusCode = FORBIDDEN_ERROR_CODE;
  }
}