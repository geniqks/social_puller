import { FastifyError } from "fastify";
import { StatusCodes } from "http-status-codes";

export type HttpExceptionOptions = Omit<FastifyError, "name" | "code"> & {
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
    this._statusCode =
      fastifyError.statusCode ?? StatusCodes.INTERNAL_SERVER_ERROR;
    this._urls = fastifyError.urls;
    Object.setPrototypeOf(this, HttpException.prototype);
  }

  public formatError(): HttpExceptionOptions {
    const error: HttpExceptionOptions = {
      message: this.message,
      statusCode: this._statusCode,
    };

    if (this._urls) {
      error.urls = this._urls;
    }

    return error;
  }
}
