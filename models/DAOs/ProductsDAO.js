import mongoose from "mongoose";
mongoose.set("strictQuery", false);
import { transformToDTO_Product } from "../DTOs/ProductDTO.js";

export default class ProductsDAO {
  constructor(model) {
    this.model = model;
  }
  
  #generateDAO(obj) {
    if (Array.isArray(obj)) {
      return obj.map((m) => {
        return {
          id: m._id,
          name: m.name,
          description: m.description,
          price: m.price,
          productFile: m.productFile,
          stock: m.stock,
          categories: m.categories
        };
      });
    } else {
      return {
        id: obj._id,
        name: obj.name,
        description: obj.description,
        price: obj.price,
        productFile: obj.productFile,
        stock: obj.stock,
        categories: obj.categories
      };
    }
  }

  async save(object) {
    try {
      const modelSaved = new this.model(object);
      const objSaved = await modelSaved.save();
      return transformToDTO_Product(this.#generateDAO(objSaved));
    } catch (error) {
      throw new Error;
    }
  }

  async getById(id) {
    try {
      const objFounded = await this.model.findOne({ _id: id });
      if(objFounded){
        return transformToDTO_Product(
          this.#generateDAO(await this.model.findOne(objFounded.id))
        );
      }
      return null
    } catch (error) {
      throw new Error;
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
      return transformToDTO_Product({ id: id, ...newObject });
    } catch (error) {
      throw new Error;
    }
  }

  async getAll() {
    try {
      const productList = await this.model.find();
      return transformToDTO_Product(this.#generateDAO(productList));
    } catch (error) {
      throw new Error;
    }
  }

  async deleteById(id) {
    try {
      return await this.model.deleteOne({ _id: id });
    } catch (error) {
      throw new Error;
    }
  }

  async deleteAll() {
    try {
      return await this.model.deleteMany({});
    } catch (error) {
      throw new Error;
    }
  }
}