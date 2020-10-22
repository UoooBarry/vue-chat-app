class message {
  user: string;
  msg: string;
  timestamp: Date

  constructor(user: string, msg: string) {
    this.user = user,
    this.msg = msg,
    this.timestamp = new Date();
  }
}

export default message;