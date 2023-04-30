import OrderDAO from '../DAOs/OrderDAO.js';
import OrderSchema from '../schemas/Order.js';

export default class OrderDAOFactory {
  constructor() {
    if(!OrderDAOFactory.instance){
      OrderDAOFactory.instance = this;
    }
    return OrderDAOFactory.instance;
  }

  getDAO(){
    return new OrderDAO(OrderSchema);
  }
}