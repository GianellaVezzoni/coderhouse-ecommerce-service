export default class Messages {
  userId;
  createdAt;
  message;

  constructor({userId,createdAt,message}) {
    this.userId = userId;
    this.createdAt = createdAt;
    this.message = message;
  }
}