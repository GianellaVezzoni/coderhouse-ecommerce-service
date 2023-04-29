import express from 'express';
import multer from 'multer';
import {verifyToken} from '../middleware/authJwt.js';
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controller/productController.js';
const router = express.Router();

//multer config
const storage = multer.diskStorage({
  destination: function(req, file, next){
    next(null, 'public/uploads');
  },
  filename: function(req, file, next){
    next(null, `${file.originalname}`);
  }
});

const upload = multer({storage: storage});
//end multer config

router.route('/products').get(verifyToken, getAllProducts);
router.route('/product/:productId').get(verifyToken, getProductById);
router.route('/create-product').post(verifyToken, upload.single('productFile'), createProduct);
router.route('/update-product/:productId').put(verifyToken, updateProduct);
router.route('/product/:productId').delete(verifyToken, deleteProduct);

export default router;