export class ResponseDTO<T> {
  status: number;
  message: string;
  data: T;

  constructor(status: number, msg: string, data: T) {
    this.status = status;
    this.message = msg;
    this.data = data;
  }

  static OK<T>(msg: string, data: T) {
    return new ResponseDTO(200, msg, data);
  }
}
