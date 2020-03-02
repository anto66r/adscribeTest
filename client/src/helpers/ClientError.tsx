
class ClientError extends Error {
  private code: string;

  private technical: string | undefined;

  private data: object | undefined;

  constructor(message: string, code?: string, technical?: string, data?: object) {
    super(message); // 'Error' breaks prototype chain here

    this.code = code || message;
    this.technical = technical || code;
    this.data = data;
    this.stack = (new Error()).stack;

    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
  }
}

export default ClientError;
