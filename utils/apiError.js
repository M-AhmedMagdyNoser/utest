class ApiError extends Error {
  constructor(statusCode, message) {
    super();
		this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.statusCode = statusCode;
    this.message = message;
  }
}

module.exports = ApiError;