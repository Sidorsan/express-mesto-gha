module.exports.SERVER_ERROR_CODE = 500;
module.exports.VALIDATION_ERROR_CODE = 400;//
module.exports.CAST_ERROR_CODE = 400;
module.exports.CAST_ERROR_CODE = 400;
module.exports.NOT_FOUND_ERROR_CODE = 404;//
module.exports.CONFLICT_ERROR_CODE = 409;//
module.exports.FORBIDDEN_ERROR_CODE = 403;//
module.exports.UNAUTHORIZED_ERROR_CODE = 401;//

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}
module.exports = NotFoundError;

class ValidationErrorCode extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}
module.exports = ValidationErrorCode;

class ForbiddenErrorCode extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
}
module.exports = ForbiddenErrorCode;

class ConflictErrorCode extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
  }
}
module.exports = ConflictErrorCode;

class UnauthorizedErrorCode extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}
module.exports = UnauthorizedErrorCode