export default class MessagesDTO {
  constructor({userId,createdAt,message}) {
    this.userId = userId;
    this.createdAt = createdAt;
    this.message = message;
  }
}

export function tranformToDTO_Messages(messages){
  if(Array.isArray(messages)){
    return messages.map(message => new MessagesDTO(message));
  }else{
    return new MessagesDTO(messages);
  }
}