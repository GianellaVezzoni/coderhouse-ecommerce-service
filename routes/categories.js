import express from 'express';
import {verifyToken} from '../middleware/authJwt.js';
import { getCategories, getCategoryById, createCategory, deleteCategory } from '../controller/categoryController.js';
const router = express.Router();

router.route('/categories').get(verifyToken, getCategories);
router.route('/products/:categoryId').get(verifyToken, getCategoryById);
router.route('/create-category').post(verifyToken, createCategory);
router.route('/category/:categoryId').delete(verifyToken, deleteCategory);

export default router;