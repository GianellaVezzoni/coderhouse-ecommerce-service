import ProductsRepo from "../repos/Product.js";

const productInstance = new ProductsRepo();

export default class ProductServices {
  async getAll() {
    return await productInstance.getAll();
  }

  async getOne(id){
    const product = await productInstance.getById(id);
    return product ? product : {}
  }

  async createOne(newProduct) {
    return await productInstance.save(newProduct);
  }

  async deleteOne(id) {
    return await productInstance.deleteById(id);
  }

  async updateProduct(id, data) {
    try {
      const oldProduct = await productInstance.getById(id);
      const updatedProduct = { ...oldProduct, ...data };
      const updated = await productInstance.update(id, updatedProduct);
      return updated;
    } catch (error) {}
  }
}