import express from 'express';
import {getAllUsers, getUserById, createUser, updateUser, deleteUser} from '../controller/userController.js';
import {signup, signin} from '../controller/authController.js';
import {verifyToken} from '../middleware/authJwt.js';
const router = express.Router();

router.route('/users').get(verifyToken, getAllUsers);
router.route('/users/:userId').get(verifyToken, getUserById);
router.route('/users').post(verifyToken, createUser);
router.route('/users/:userId').put(verifyToken, updateUser);
router.route('/user/:userId').delete(verifyToken, deleteUser);
router.route('/signup').post(signup);
router.route('/login').post(signin);

export default router;