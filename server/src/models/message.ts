class message {
  user: string;
  msg: string;
  user_id: string;
  timestamp: Date;

  constructor(user_id: string, user: string, msg: string) {
    this.user_id = user_id;
    this.user = user,
    this.msg = msg,
    this.timestamp = new Date();
  }
}

export default message;