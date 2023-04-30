import ProductService from '../services/Product.js';
const productInstance = new ProductService();

export const getAllProducts = async (_, res) => {
  try {
    const products = await productInstance.getAll();
    res.status(200).json({
      msg: 'Productos encontrados',
      data: products
    });
  } catch (err) {
    res.status(400).json({
      msg: 'Error al traer los productos',
      err: err
    });
  }
}

export const createProduct = async (req, res) => {
  try {
      const { name, description, price, productFile, stock, categories } = req.body;
      const newProduct = {
        name,
        description,
        price,
        productFile,
        stock,
        categories
    }
      const product = await productInstance.createOne(newProduct);
      res.status(201).json({
        msg: 'Producto creado',
        data: product
      })
  } catch (err) {
      res.status(400).json({
        msg: 'Error al crear el producto',
        err: err
      });
  }
}

export const getProductById = async (req, res) => {
  try {
    const {productId} = req.params;
    const productFounded = await productInstance.getOne(productId);
    if(!productFounded){
      return res.status(404).json({
        msg: 'Producto no encontrado',
      });
    }
    return res.status(200).json({
      msg: 'Producto encontrado',
      data: productFounded
    });
  } catch (err) {
    res.status(400).json({
      msg: 'Error al obtener el producto',
      err: err
    });
  }
}

export const updateProduct = async (req, res) => {
  try {
    const {productId} = req.params;
      if(!productId){
        return res.status(404).json({
          msg: 'Producto no encontrado',
        });
      }
    const { name, description, productFile, price, stock } = req.body
    const productUpdated = await productInstance.updateProduct(productId, { name, description, price, productFile, stock });
    return res.status(200).json({
      msg: 'Producto actualizado',
      data: productUpdated
    });
  } catch (err) {
    res.status(400).json({
      msg: 'Error al actualizar el producto',
      err: err
    })
  }
}

export const deleteProduct = async (req, res) => {
  try {
    const {productId} = req.params;
      if(!productId){
        return res.status(404).json({
          msg: 'Producto no encontrado',
        });
      }
    const productDeleted = await productInstance.deleteOne(productId);
    res.status(200).json({
      msg: 'Producto eliminado',
      data: productDeleted
    });
  } catch (err) {
    res.status(400).json({
      msg: 'Error al eliminar el producto',
      err: err
    })
  }
}