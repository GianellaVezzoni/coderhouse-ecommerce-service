import CategoryRepo from '../repos/Category.js';
import ProductsRepo from '../repos/Product.js';

const categoryInstance = new CategoryRepo();
const prodocutInstance = new ProductsRepo();

export default class CartService {
  async getAll(){
    return await categoryInstance.getAll();
  }
  
  async getOne(id){
    const category = await categoryInstance.getById(id);
    if(category){
      const products = await prodocutInstance.getAll();
      const productsList = products.filter(prod => prod.categoryId === id);
      return {
        category: category,
        products: productsList
      }
    }
    return null
  }

  async create(category){
    return await categoryInstance.save(category);
  }

  async update(id, products){
    return await categoryInstance.update(id, products);
  }

  async deleteOne(id){
    return await categoryInstance.deleteById(id);
  }
}