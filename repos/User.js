import User from "../models/model/User.js"
import UserDAOFactory from "../models/factories/User.js";
import { transformToDTO_User } from "../models/DTOs/UserDTO.js";

export default class UserRepo {
  constructor() {
    this.factory = new UserDAOFactory();
    this.dao = this.factory.getDAO()
  }

  async getAll() {
    const dtos = await this.dao.getAll()
    return dtos.map(dto => new User(dto))
  }

  async getById(id) {
    const dto = await this.dao.getById(id);
    return new User(dto);
  }

  async save(user) {
    const dto = transformToDTO_User(user);
    const saved = await this.dao.save(dto);
    return new User(saved)
  }

  async deleteById(id) {
    return await this.dao.deleteById(id);
  }

  async update(id, user) {
    const updated = await this.dao.update(id, transformToDTO_User(user))
    return new User(updated)
  }

  async getByUsername(username){
    return await this.dao.getByUsername(username);
  }
}