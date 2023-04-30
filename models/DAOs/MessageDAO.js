import mongoose from "mongoose";
mongoose.set("strictQuery", false);
import { tranformToDTO_Messages } from "../DTOs/MessageDTO.js";

export default class MessageDAO {
  constructor(model) {
    this.model = model;
  }

  #generateDAO(obj) {
    return {
      userId: obj.userId, 
      createdAt: createdAt,
      message: message
    };
  }

  async save(object) {
    try {
      const modalObj = new this.model(object);
      const objToSave = await modalObj.save();
      return tranformToDTO_Messages(this.#generateDAO(objToSave));
    } catch (error) {
      throw new Error(error);
    }
  }

  async getById(id) {
    try {
      const cartFounded = await this.model.findOne({ _id: id });
      if(cartFounded){
        return tranformToDTO_Messages(
          this.#generateDAOCompatible(await this.model.findOne(cartFounded))
        )
      }
      return null;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAll() {
    try {
      const messagesList = await this.model.find();
      return tranformToDTO_Messages(this.#generateDAO(messagesList));
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
  
  async deleteById(id) {
    try {
      return await this.model.deleteOne({ _id: id });
    } catch (error) {
      throw new Error(error);
    }
  }
}