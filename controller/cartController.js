import CartService from '../services/Cart.js';
const cartService = new CartService();

export const createCart = async (req, res) => {
  try {
    const { products, userId } = req.body;
    const newCart = {
      products,
      userId
    }
    const cart = await cartService.create(newCart);
    return res.status(201).json({
      msg: 'Carrito creado',
      data: cart
    });
  } catch (err) {
    return res.status(400).json({
      msg: 'Error al crear el carrito',
      err: err
    });
  }
}

export const getCartById = async (req, res) => {
  try {
    const {cartId} = req.params;
    const cartFounded = await cartService.getOne(cartId);
    if(!cartFounded){
      return  res.status(404).json({
        msg: 'Carrito no encontrado'
      });
    }
    return res.status(200).json({
      msg: 'Carrito encontrado',
      data: cartFounded
    });
  } catch (err) {
    return res.status(400).json({
      msg: 'Error al obtener el carrito',
      err: err
    });
  }
}

export const updateCart = async (req, res) => {
  try {
    const {cartId} = req.params;
    const { products } = req.body;
    const cartUpdated = await cartService.update(cartId, products);
    return res.status(200).json({
      msg: 'Carrito actualizado',
      data: cartUpdated
    });
  } catch (err) {
    return res.status(400).json({
      msg: 'Error al actualizar el carrito',
      err: err
    })
  }
}

export const deleteCart = async (req, res) => {
  try {
    const {cartId} = req.params;
    const cartDeleted = await cartService.deleteOne(cartId);
    if(!cartDeleted){
      return res.status(404).json({
        msg: 'Id de carrito incorrecto',
      });
    }
    return res.status(200).json({
      msg: 'Carrito eliminado',
      data: cartDeleted
    });
  } catch (err) {
    return res.status(400).json({
      msg: 'Error al eliminar el carrito',
      err: err
    });
  }
}