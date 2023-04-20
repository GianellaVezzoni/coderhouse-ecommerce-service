import express from 'express';
import {verifyToken} from '../middleware/authJwt.js';
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controller/productController.js';
const router = express.Router();

router.route('/products').get(verifyToken, getAllProducts);
router.route('/product/:productId').get(verifyToken, getProductById);
router.route('/create-product').post(verifyToken, createProduct);
router.route('/update-product/:productId').put(verifyToken, updateProduct);
router.route('/product/:productId').delete(verifyToken, deleteProduct);

export default router;