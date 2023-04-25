import express from 'express';
import {getCartById, updateCart, deleteCart, createCart} from '../controller/cartController.js';
import {verifyToken} from '../middleware/authJwt.js';
const router = express.Router();

router.route('/cart/:cartId').get(verifyToken, getCartById);
router.route('/cart').post(verifyToken, createCart);
router.route('/cart/:cartId').put(verifyToken, updateCart);
router.route('/cart/:cartId').delete(verifyToken, deleteCart);

export default router;