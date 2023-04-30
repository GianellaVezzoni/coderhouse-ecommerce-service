import ProductsDAO from '../DAOs/ProductsDAO.js';
import ProductSchema from '../schemas/Product.js';

export default class ProductDAOFactory {
  constructor() {
    if(!ProductDAOFactory.instance){
      ProductDAOFactory.instance = this;
    }
    return ProductDAOFactory.instance;
  }

  getDAO(){
    return new ProductsDAO(ProductSchema);
  }
}