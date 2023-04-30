import CategoryDAO from '../DAOs/CategoryDAO.js';
import CategorySchema from '../schemas/Category.js';

export default class CategoryDAOFactory {
  constructor() {
    if(!CategoryDAOFactory.instance){
      CategoryDAOFactory.instance = this;
    }
    return CategoryDAOFactory.instance;
  }

  getDAO(){
    return new CategoryDAO(CategorySchema);
  }
}