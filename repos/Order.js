import Order from "../models/model/Order.js";
import OrderDAOFactory from "../models/factories/Order.js";
import { transformToDTO_Orders } from "../models/DTOs/OrderDTO.js";

export default class OrderRepo {
  constructor() {
    this.factory = new OrderDAOFactory()
    this.dao = this.factory.getDAO();
  }

  async getAll() {
    const dtos = await this.dao.getAll();
    return dtos.map((dto) => new Order(dto));
  }

  async getById(id) {
    const dto = await this.dao.getById(id);
    return dto ? new Order(dto) : null;
  }

  async save(order) {
    const dto = transformToDTO_Orders(order);
    const saved = await this.dao.save(dto);
    return new Order(saved);
  }

  async deleteById(id) {
    const removed = await this.dao.deleteById(id);
    return removed;
  }
}