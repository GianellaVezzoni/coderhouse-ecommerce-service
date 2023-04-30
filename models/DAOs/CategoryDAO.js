import mongoose from "mongoose";
mongoose.set("strictQuery", false);
import { transformToDTO_Category } from "../DTOs/CategoryDTO.js";

export default class CategoryDAO {
  constructor(model) {
    this.model = model;
  }

  #generateDAO(obj) {
    if (Array.isArray(obj)) {
      return obj.map((m) => {
        return {
          id: m._id,
          name: m.name, 
        };
      })
    }else{
      return {
        id: obj._id,
        name: obj.name, 
      };
    }
  }

  async save(object) {
    try { 
      const modalObj = new this.model(object);
      const objToSave = await modalObj.save();
      return transformToDTO_Category(this.#generateDAO(objToSave));
    } catch (error) {
      throw new Error(error);
    }
  }

  async getById(id) {
    try {
      const cartFounded = await this.model.findOne({ _id: id });
      if(cartFounded){
        return transformToDTO_Category(
          this.#generateDAO(await this.model.findOne(cartFounded))
        )
      }
      return null;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAll() {
    try {
      const categoriesList = await this.model.find();
      return transformToDTO_Category(this.#generateDAO(categoriesList));
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