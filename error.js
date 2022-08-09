const SERVER_ERROR_CODE = 500;
const VALIDATION_ERROR_CODE = 400; //
const CAST_ERROR_CODE = 400; //
const NOT_FOUND_ERROR_CODE = 404; //
const CONFLICT_ERROR_CODE = 409; //
const FORBIDDEN_ERROR_CODE = 403;
const UNAUTHORIZED_ERROR_CODE = 401;

// const CAST_ERROR_CODE = 400


// const {CAST_ERROR_CODE}= require('./errors');
class CastErrorCode extends Error {
  constructor(message) {
    super(message);
    this.statusCode = CAST_ERROR_CODE;
  }
}
// module.exports = {CastErrorCode}

// const {CONFLICT_ERROR_CODE }= require('./errors');
class ConflictErrorCode extends Error {
  constructor(message) {
    super(message);
    this.statusCode = CONFLICT_ERROR_CODE;
  }
}

// const {FORBIDDEN_ERROR_CODE }= require('./errors');
class ForbiddenErrorCode extends Error {
  constructor(message) {
    super(message);
    this.statusCode = FORBIDDEN_ERROR_CODE;
  }
}

// const {NOT_FOUND_ERROR_CODE }= require('./errors');
class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = NOT_FOUND_ERROR_CODE;
  }
}

// const {UNAUTHORIZED_ERROR_CODE }= require('./errors');
class UnauthorizedErrorCode extends Error {
  constructor(message) {
    super(message);
    this.statusCode = UNAUTHORIZED_ERROR_CODE;
  }
}

// const {VALIDATION_ERROR_CODE}= require('./errors');
class ValidationErrorCode extends Error {
  constructor(message) {
    super(message);
    this.statusCode = VALIDATION_ERROR_CODE;
  }
}

module.exports = {
  CastErrorCode,
  ConflictErrorCode,
  ForbiddenErrorCode,
  NotFoundError,
  UnauthorizedErrorCode,
  ValidationErrorCode,

};
