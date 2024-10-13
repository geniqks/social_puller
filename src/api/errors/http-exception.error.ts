import { FastifyError } from "fastify";

export class HttpException extends Error {
  private _statusCode: number;

  public get statusCode() {
    return this._statusCode;
  }

  constructor(fastifyError: Omit<FastifyError, "name" | "code">) {
    super(fastifyError.message);
    this._statusCode = fastifyError.statusCode ?? 500;
    Object.setPrototypeOf(this, HttpException.prototype);
  }

  public formatError() {
    return {
      message: this.message,
      statusCode: this._statusCode,
    };
  }
}
