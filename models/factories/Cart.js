import CartDAO from '../DAOs/CartDAO.js';
import CartSchema from '../schemas/Cart.js';

export default class CartDAOFactory {
  constructor() {
    if(!CartDAOFactory.instance){
      CartDAOFactory.instance = this;
    }
    return CartDAOFactory.instance;
  }

  getDAO(){
    return new CartDAO(CartSchema);
  }
}