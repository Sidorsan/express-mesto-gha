const {UNAUTHORIZED_ERROR_CODE }= require('./errors');
module.exports = class UnauthorizedErrorCode extends Error {
  constructor(message) {
    super(message);
    this.statusCode = UNAUTHORIZED_ERROR_CODE;
  }
}