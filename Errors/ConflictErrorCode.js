const {CONFLICT_ERROR_CODE }= require('./errors');
module.exports = class ConflictErrorCode extends Error {
  constructor(message) {
    super(message);
    this.statusCode = CONFLICT_ERROR_CODE;
  }
}

