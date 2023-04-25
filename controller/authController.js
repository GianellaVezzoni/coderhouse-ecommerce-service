import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { sendEmails } from '../utils/sendEmails.js';

const EXPIRATION_TIME = 28800

export const signup = async (req, res) => {
  try {
      const { username, password, name, phone } = req.body;
      const userFounded = await User.findOne({username: username});
      if(userFounded){
        return res.status(400).json({
          msg: 'Email ya registrado'
        });
      }
      const newUser = new User({
          username,
          name: name,
          phone: phone,
          password: await User.encryptPassword(password),
      })
      const registeredUser = await newUser.save();
      await sendEmails(username, 'Usuario registrado en Rappi shop', `
      <p>Bienvenido usuario ${name}: <br/>
        Estamos muy ansiosos que te hayas registrado en nuestra plataforma.
        Esperamos que disfrutes comprar en nuestra plataforma. <br /> <br/>
        Atte. Rappi shop
      </p>`);
      return res.status(200).json({ 
        msg: 'Usuario registrado',
        data: registeredUser
       })
  } catch (error) {     
      console.log(error);
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
        email: userFound.username,
        token
      });
  } catch (error) {
      res.status(400).json({error, message: 'Error al iniciar sesion'})
  }
}