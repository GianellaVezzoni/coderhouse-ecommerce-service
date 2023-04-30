import MessageDAO from '../DAOs/MessageDAO.js';
import MessageSchema from '../schemas/Messages.js';

export default class MessageDAOFactory {
  constructor() {
    if(!MessageDAOFactory.instance){
      MessageDAOFactory.instance = this;
    }
    return MessageDAOFactory.instance;
  }

  getDAO(){
    return new MessageDAO(MessageSchema);
  }
}