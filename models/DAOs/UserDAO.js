import mongoose from "mongoose";
mongoose.set("strictQuery", false);
import { transformToDTO_User } from "../DTOs/UserDTO.js";

export default class UserDAO {
  constructor(model) {
    this.model = model;
  }

  #generateDAO(obj) {
    if (Array.isArray(obj)) {
      return obj.map((m) => {
        return {
          id: m._id,
          username: m.username,
          name: m.name,
          password: m.password,
          phone: m.phone,
          roles: m.roles,
        };
      });
    } else {
      return {
        id: obj._id,
        username: obj.username,
        name: obj.name,
        password: obj.password,
        phone: obj.phone,
        roles: obj.roles,
      };
    }
  }

  async save(object) {
    try {
      const saveModel = new this.model(object);
      const saved = await saveModel.save();
      return transformToDTO_User(this.#generateDAO(saved));
    } catch (error) {
      throw new Error(error);
    }
  }

  async getByUsername(username){
    try {
      const userFounded = await this.model.findOne({ username: username });
      if(userFounded){
        return transformToDTO_User(
          this.#generateDAO(await this.model.findOne(userFounded))
        );
      }
      return null;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getById(id) {
    try {
      const objFounded = await this.model.findOne({ _id: id });
      if(objFounded){
        return transformToDTO_User(
          this.#generateDAO(await this.model.findOne(objFounded))
        );
      }
      return null;
    } catch (error) {
      throw new Error(error);
    }
  }

  #replaceId(obj) {
    obj["_id"] = obj["id"];
    delete obj["id"];
    return obj;
  }

  async update(id, newObject) {
    try {
      this.#replaceId(newObject);
      await this.model.updateOne({ _id: id }, newObject);
      return transformToDTO_User({ id: id, ...newObject });
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAll() {
    try {
      const usersList = await this.model.find();
      return transformToDTO_User(this.#generateDAO(usersList));
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteById(id) {
    try {
      return await this.model.deleteOne({ _id: id });
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteAll() {
    try {
      return await this.model.deleteMany({});
    } catch (error) {
      throw new Error(error);
    }
  }
}