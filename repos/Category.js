import Category from "../models/model/Category.js";
import CategoryDAOFactory from "../models/factories/Category.js";
import { transformToDTO_Category } from "../models/DTOs/CategoryDTO.js";

export default class CategoryRepo {
  constructor() {
    this.factory = new CategoryDAOFactory()
    this.dao = this.factory.getDAO();
  }

  async getAll() {
    const categoriesDao = await this.dao.getAll();
    return categoriesDao?.map((dto) => new Category(dto));
  }

  async getById(id) {
    const dto = await this.dao.getById(id);
    return dto ? new Category(dto) : null;
  }

  async save(category) {
    const dto = transformToDTO_Category(category);
    const saved = await this.dao.save(dto);
    return new Category(saved);
  }

  async update(id, category) {
    const updated = await this.dao.update(id, transformToDTO_Category(category));
    return new Category(updated);
  }

  async deleteById(id) {
    const removed = await this.dao.deleteById(id);
    return removed;
  }
}