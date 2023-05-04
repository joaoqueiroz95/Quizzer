export class HttpException extends Error {
  errorCode: number;

  constructor(errorCode: number, public readonly message: string) {
    super(message);
    this.errorCode = errorCode;
    this.name = "HttpException";
  }
}
