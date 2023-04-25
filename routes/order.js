import express from 'express';
import {verifyToken} from '../middleware/authJwt.js';
import { getAllOrders, getOderById, createOrder, deleteOrder } from '../controller/orderController.js';
const router = express.Router();

router.route('/ordenes').get(verifyToken, getAllOrders);
router.route('/orden/:orderId').get(verifyToken, getOderById);
router.route('/crear-orden').post(verifyToken, createOrder);
router.route('/orden/:orderId').delete(verifyToken, deleteOrder);

export default router;