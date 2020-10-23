declare class message {
    user: string;
    msg: string;
    user_id: string;
    timestamp: Date;
    constructor(user_id: string, user: string, msg: string);
}
export default message;
