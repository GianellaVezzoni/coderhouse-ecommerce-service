import Product from "../models/model/Product.js";
import ProductDAOFactory from "../models/factories/Product.js";
import { transformToDTO_Product } from "../models/DTOs/ProductDTO.js";

export default class ProductRepo {
  constructor() {
    this.factory = new ProductDAOFactory();
    this.dao = this.factory.getDAO();
  }

  async getAll() {
    const products = await this.dao.getAll();
    return products.map((dto) => new Product(dto));
  }

  async getById(id) {
    const dto = await this.dao.getById(id);
    return dto ? new Product(dto) : null;
  }

  async save(product) {
    const dto = transformToDTO_Product(product);
    const saved = await this.dao.save(dto);
    return new Product(saved);
  }

  async deleteAll() {
    await this.dao.deleteAll();
  }

  async deleteById(id) {
    const removed = await this.dao.deleteById(id);
    return removed;
  }

  async update(id, product) {
    const updated = await this.dao.update(id, transformToDTO_Product(product));
    return new Product(updated);
  }
}