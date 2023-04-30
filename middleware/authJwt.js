import jwt from 'jsonwebtoken';
import UserService from '../services/User.js';
const userServiceInstance = new UserService();

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers['token']
    if (!token) return res.status(403).json({message:'Las credenciales de autenticación no son válidas'})
    const decoded = jwt.verify(token, process.env.SECRETPRIVATEKEY);
    const userFound = await userServiceInstance.findOneByUsername(decoded.id);
    if (!userFound) return res.status(404).json({message: 'Usuario no encontrado'})
    next()
  } catch (err) {
    return res.status(401).json({message: 'No ha proporcionado las credenciales necesarias para realizar la operación'})
  }
}