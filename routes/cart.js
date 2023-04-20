import express from 'express';
import {getCartById, updateCart, deleteCart, createCart} from '../controller/cartController.js';
import {verifyToken} from '../middleware/authJwt.js';
const router = express.Router();

router.route('/users/:userId').get(verifyToken, getCartById);
router.route('/users').post(verifyToken, createCart);
router.route('/users/:userId').put(verifyToken, updateCart);
router.route('/user/:userId').delete(verifyToken, deleteCart);

export default router;