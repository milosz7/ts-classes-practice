class CustomError {
  constructor(private _status: number, private _message: string) {
    this._message = _message;
    this._status = _status;
  }

  get message() {
    return this._message;
  }

  get status() {
    return this._status;
  }
}

export default CustomError;
