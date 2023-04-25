import Order from "../models/Order.js";
import Cart from '../models/Cart.js';
import User from '../models/User.js';
import { sendEmails } from '../utils/sendEmails.js';

export const getAllOrders = async (_, res) => {
  try {
    const orders = await Order.find({});
    res.status(200).json({
      msg: 'Ordenes encontradas',
      data: orders
    });
  } catch (err) {
    res.status(400).json({
      msg: 'Error al traer las ordenes',
      err: err
    });
  }
}

export const createOrder = async (req, res) => {
  try {
    const { products, userId } = req.body;
    const cartFounded = await Cart.find({userId: userId});
    await Cart.findByIdAndDelete(cartFounded.id);
    const userData = await User.findById(userId);
    const orders = await Order.find({});
    const orderNumber = orders.length + 1;
    const newOrder = new Order({
      orderNumber,
      products,
      status: 'generated',
      userId,
      createdAt: new Date(),
      email: userData.username
    });
    const order = await newOrder.save();
    await sendEmails(userData.username, 'Orden de compra de Rappi shop', `
      <p>Hola usuario ${userData.name}: </p><br />
        <p>Se ha registrado una compra con el número #${orderNumber}</p>
        <p>Para más información, ingresa a nuestro sitio.</p>
        <br /><br />
        <p>Atte. Rappi shop</p>
      `);
    return res.status(201).json({
      msg: 'Orden creada',
      data: order
    });
  } catch (err) {
    res.status(400).json({
      msg: 'Error al crear la orden',
      err: err
    });
  }
}

export const getOderById = async (req, res) => {
  try {
    const {orderId} = req.params;
    if(!orderId){
      return res.status(404).json({
        msg: 'Orden no encontrada',
      });
    }
    const OrderFounded = await Order.findById(orderId);
    res.status(200).json({
      msg: 'Orden encontrada',
      data: OrderFounded
    });
  } catch (err) {
    res.status(400).json({
      msg: 'Error al obtener la orden',
      err: err
    });
  }
}

export const deleteOrder = async (req, res) => {
  try {
    const {orderId} = req.params;
      if(!orderId){
        return res.status(404).json({
          msg: 'Orden no encontrada',
        });
      }
    const orderDeleted = await Order.findByIdAndUpdate(orderId, {status: 'deleted'});
    res.status(200).json({
      msg: 'Orden eliminada',
      data: orderDeleted
    });
  } catch (err) {
    res.status(400).json({
      msg: 'Error al eliminar la orden',
      err: err
    })
  }
}