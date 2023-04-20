import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const verifyToken = async (req, res, next) => {
  try {
      const token = req.headers['token']
      if (!token) return res.status(403).json({message:'Las credenciales de autenticación no son válidas'})
      const decoded = jwt.verify(token, process.env.SECRETPRIVATEKEY)
      req.userId = decoded.id
      const userFound = await User.findById(decoded.id, {password: 0})
      if (!userFound) return res.status(404).json({message: 'Usuario no encontrado'})
      next()
  } catch (err) {
    console.log('erro ', err)
      return res.status(401).json({message: 'No ha proporcionado las credenciales necesarias para realizar la operación'})
  }
}