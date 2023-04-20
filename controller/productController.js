import Product from "../models/Product.js";

export const getAllProducts = async (_, res) => {
  try {
    const products = await Product.find({});
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
      const { name, description, price, image, stock } = req.body
      const newProduct = new Product({
          name,
          description,
          price,
          image,
          stock
      })
      const product = await newProduct.save();
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
      if(!productId){
        return res.status(404).json({
          msg: 'Producto no encontrado',
        });
      }
      const productFounded = await Product.findById(req.params.productId);
      res.status(200).json({
        msg: 'Producto encontrado',
        data: productFounded
      })
  } catch (err) {
      res.status(400).json({
        msg: 'Error al obtener el producto',
        err: err
      })
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
    const { name, description, price, image, stock } = req.body
    const productUpdated = await Product.findByIdAndUpdate(req.params.productId, { name, description, price, image, stock }, { new: true });
    res.status(200).json({
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
    const productDeleted = await Product.deleteOne(req.params.productId);
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