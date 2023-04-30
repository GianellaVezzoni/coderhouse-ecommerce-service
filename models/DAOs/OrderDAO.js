import mongoose from "mongoose";
mongoose.set("strictQuery", false);
import { transformToDTO_Orders } from "../DTOs/OrderDTO.js";

export default class OrdersDAOMongoose {
  constructor(model) {
    this.model = model;
  }

  #generateDAO(obj) {
    if (Array.isArray(obj)) {
      return obj.map((m) => {
        return { 
          id: m._id,
          orderNumber: m.orderNumber,
          products: m.products,
          total: m.total,
          createdAt: m.createdAt,
          status: m.status,
          userId: m.userId,
          email: m.email
        };
      });
    } else {
      return {
        id: obj._id,
        orderNumber: obj.orderNumber,
        products: obj.products,
        total: obj.total,
        createdAt: obj.createdAt,
        status: obj.status,
        userId: obj.userId,
        email: obj.email
      };
    }
  }

  async save(object) {
    try {
      const modelSaved = new this.model(object);
      const objSaved = await modelSaved.save();
      return transformToDTO_Orders(this.#generateDAO(objSaved));
    } catch (error) {
      throw new Error(error);
    }
  }

  async getById(id) {
    try {
      const objFounded = await this.model.findOne({ _id: id });
      if(objFounded){
        return transformToDTO_Orders(
          this.#generateDAO(await this.model.findOne(objFounded))
        )
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
      return transformToDTO_Orders({ id: id, ...newObject });
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAll() {
    try {
      const ordersList = await this.model.find();
      return transformToDTO_Orders(this.#generateDAO(ordersList));
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