import UserDAO from '../DAOs/UserDAO.js';
import UserSchema from '../schemas/User.js';

export default class UserDAOFactory {
  constructor() {
    if(!UserDAOFactory.instance){
      UserDAOFactory.instance = this;
    }
    return UserDAOFactory.instance;
  }

  getDAO(){
    return new UserDAO(UserSchema);
  }
}