import { FastifyError } from "fastify";
type HttpExceptionOptions = Omit<FastifyError, "name" | "code"> & {
  urls?: string[];
};

export class HttpException extends Error {
  private _statusCode: number;
  private _urls?: string[];
  public get statusCode() {
    return this._statusCode;
  }

  constructor(fastifyError: HttpExceptionOptions) {
    super(fastifyError.message);
    this._statusCode = fastifyError.statusCode ?? 500;
    this._urls = fastifyError.urls;
    Object.setPrototypeOf(this, HttpException.prototype);
  }

  public formatError() {
    return {
      message: this.message,
      urls: this._urls,
      statusCode: this._statusCode,
    };
  }
}
