const {CONFLICT_ERROR_CODE }= require('./errors');
 class ConflictErrorCode extends Error {
  constructor(message) {
    super(message);
    this.statusCode = CONFLICT_ERROR_CODE;
  }
}
module.exports = ConflictErrorCode
