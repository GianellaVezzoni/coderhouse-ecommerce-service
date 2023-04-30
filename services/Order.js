import OrderRepo from '../repos/Order.js';

const orderInstance = new OrderRepo();

export default class OrderService { 
  async getAll(){
    return await orderInstance.getAll();
  }

  async getOne(id){
    return await orderInstance.getById(id);
  }

  async save(order){
    return await orderInstance.save(order);
  }

  async deleteOne(id){
    return await orderInstance.deleteById(id);
  }
}