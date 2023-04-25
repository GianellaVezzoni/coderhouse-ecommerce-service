import Cart from '../models/Cart.js';

export const createCart = async (req, res) => {
  try {
      const { products, userId } = req.body;
      const newCart = new Cart({
        products,
        userId
      });

      const cart = await newCart.save();
      res.status(201).json({
        msg: 'Carrito creado',
        data: cart
      });
  } catch (err) {
      res.status(400).json({
        msg: 'Error al crear el carrito',
        err: err
      });
  }
}

export const getCartById = async (req, res) => {
  try {
      const cartFounded = await Cart.findById(req.params.cartId);
      if(!cartFounded){
        return  res.status(404).json({
          msg: 'Carrito no encontrado'
        });
      }
      res.status(200).json({
        msg: 'Carrito encontrado',
        data: cartFounded
      });
  } catch (err) {
      res.status(400).json({
        msg: 'Error al obtener el carrito',
        err: err
      })
  }
}

export const updateCart = async (req, res) => {
  try {
    const {cartId} = req.params;
    const { products } = req.body;
    const cartUpdated = await Cart.findByIdAndUpdate(cartId, { products }, { new: true });
    res.status(200).json({
      msg: 'Carrito actualizado',
      data: cartUpdated
    });
  } catch (err) {
    res.status(400).json({
      msg: 'Error al actualizar el carrito',
      err: err
    })
  }
}

export const deleteCart = async (req, res) => {
  try {
    const cartDeleted = await Cart.findByIdAndDelete(req.params.cartId);
    if(!cartDeleted){
      return res.status(404).json({
        msg: 'Id de carrito incorrecto',
      });
    }
    res.status(200).json({
      msg: 'Carrito eliminado',
      data: cartDeleted
    });
  } catch (err) {
    res.status(400).json({
      msg: 'Error al eliminar el carrito',
      err: err
    })
  }
}