import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const EXPIRATION_TIME = 28800

export const signup = async (req, res) => {
  try {
      const { username, password } = req.body
      const newUser = new User({
          username,
          password: await User.encryptPassword(password),
      })
      const registeredUser = await newUser.save()
      const token = jwt.sign({ id: registeredUser._id }, process.env.SECRET, {
          expiresIn: EXPIRATION_TIME, // 8 horas
      });
      return res.status(200).json({ token })
  } catch (error) {     
      return res.status(500).json(error)
  }
}

export const signin = async (req, res) => {
  try {
      const userFound = await User.findOne({ username: req.body.username });
      if (!userFound) return res.status(400).json({ message: 'Usuario no registrado' })
      const passwordValid = await User.comparePasswordAndHash(req.body.password, userFound.password)
      if (!passwordValid) {
          return res.status(401).json({
              token: null,
              message: 'Las credenciales ingresadas no son correctas por favor intentelo de nuevo',
          })
      }
      const token = jwt.sign({ id: userFound._id }, process.env.SECRETPRIVATEKEY, { expiresIn: EXPIRATION_TIME, })
      res.json({
        msg: 'Inicio de sesion correcto',
        token
    })
  } catch (error) {
    console.log('el error ', error)
      res.status(400).json({error, message: '?'})
  }
}