import CartRepo from '../repos/Cart.js';

const cartInstance = new CartRepo();

export default class CartService {
  async getOne(id){
    const cartFounded = await cartInstance.getById(id);
    return cartFounded;
  }

  async create(cart){
    const cartCreated = await cartInstance.save(cart);
    return cartCreated;
  }

  async update(id, products){
    const cartUpdated = await cartInstance.update(id, products);
    return cartUpdated;
  }

  async deleteOne(id){
    return await cartInstance.deleteById(id);
  }

  async getOneByUserIdAndDelete(userId){
    const carts = await cartInstance.getAll();
    const cartFounded = carts.find(e => e.userId === userId);
    if(cartFounded){
      await cartInstance.deleteById(cartFounded.id);
    }
    return;
  }
}