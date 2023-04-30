import Cart from "../models/model/Cart.js";
import CartDAOFactory from "../models/factories/Cart.js";
import { transformToDTO_Carts } from "../models/DTOs/CartDTO.js";

export default class CartRepo {
  constructor() {
    this.factory = new CartDAOFactory()
    this.dao = this.factory.getDAO();
  }

  async getById(id) {
    const dto = await this.dao.getById(id);
    return dto ? new Cart(dto) : null;
  }

  async getAll(){
    return await this.dao.getAll();
  }

  async save(cart) {
    const dto = transformToDTO_Carts(cart);
    const saved = await this.dao.save(dto);
    return new Cart(saved);
  }

  async update(id, cart) {
    const updated = await this.dao.update(id, transformToDTO_Carts(cart));
    return new Cart(updated);
  }
  
  async deleteById(id) {
    const removed = await this.dao.deleteById(id);
    return removed;
  }
}