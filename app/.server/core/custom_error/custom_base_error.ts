export class CustomBaseError extends Error {
  public statusCode: number;
  public errorCode: string;
  public details: unknown;

  constructor(
    message: string,
    statusCode: number = 500,
    errorCode: string = 'UNKNOWN_ERROR',
    details: unknown = null,
  ) {
    super(message);

    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.details = details;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  public toJSON() {
    return {
      name: this.name,
      message: this.message,
      statusCode: this.statusCode,
      errorCode: this.errorCode,
      details: this.details,
    };
  }
}
