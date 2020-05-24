export enum HttpStatus {
  BAD_DATA = 400,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  UNPROCESSABLE_ENTITY = 422,
}

export class HttpException extends Error {
  private readonly response: string | Record<string, any>
  private readonly status: number

  constructor(response: string | Record<string, any>, status: number) {
    super()

    this.response = response
    this.status = status
  }

  getResponse(): string | Record<string, any> {
    return this.response
  }

  getStatus(): number {
    return this.status
  }

  createBody(): Record<string, any> {
    if (typeof this.response === 'string') {
      return {
        message: this.response,
        status: this.status,
      }
    }

    return this.response
  }
}
