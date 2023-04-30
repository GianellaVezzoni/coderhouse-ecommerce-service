import mongoose from "mongoose";
mongoose.set("strictQuery", false);
import { transformToDTO_Carts } from "../DTOs/CartDTO.js";

export default class CartDAO {
  constructor(model) {
    this.model = model;
  }

  #generateDAO(obj) {
    if (Array.isArray(obj)) {
      return obj.map((m) => {
        return { id: m._id, userId: m.userId, products: m.products, total: m.total, createdAt: m.createdAt };
      });
    } else {
      return {
        id: obj._id,
        userId: obj.userId, 
        products: obj.products, 
        total: obj.total, 
        createdAt: obj.createdAt
      };
    }
  }

  async save(object) {
    try {
      const modalObj = new this.model(object);
      const objToSave = await modalObj.save();
      return transformToDTO_Carts(this.#generateDAO(objToSave));
    } catch (error) {
      throw new Error(error);
    }
  }

  async getById(id) {
    try {
      const cartFounded = await this.model.findOne({ _id: id });
      if(cartFounded){
        return transformToDTO_Carts(
          this.#generateDAO(await this.model.findOne(cartFounded))
        )
      }
      return null;
    } catch (error) {
      throw new Error(error);
    }
  }

  #replaceID(obj) {
    obj["_id"] = obj["id"];
    delete obj["id"];
    return obj;
  }

  async update(id, data) {
    try {
      this.#replaceID(data);
      await this.model.updateOne({ _id: id }, data);
      return transformToDTO_Carts({ id: id, ...data });
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAll() {
    try {
      const cartList = await this.model.find();
      return transformToDTO_Carts(this.#generateDAO(cartList));
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