import jwt from 'jsonwebtoken';
import { sendEmails } from '../utils/sendEmails.js';
import UserService from '../services/User.js';

const userInstance = new UserService();
const EXPIRATION_TIME = 28800

export const signup = async (req, res) => {
  try {
    const { username, password, name, phone } = req.body;
    const userFounded = await userInstance.findOneByUsername(username);
    if(userFounded){
      return res.status(400).json({
        msg: 'Email ya registrado'
      });
    }
    const newUser = {
      username,
      name: name,
      phone: phone,
      password: password,
    };
    const registeredUser = await userInstance.signUp(newUser);
    await sendEmails(username, 'Usuario registrado en Rappi shop', `
    <p>Bienvenido usuario ${name}: <br/>
      Estamos muy ansiosos que te hayas registrado en nuestra plataforma.
      Esperamos que disfrutes comprar en nuestra plataforma. <br /> <br/>
      Atte. Rappi shop
    </p>`);
    return res.status(200).json({ 
      msg: 'Usuario registrado',
      data: registeredUser
    });
  } catch (error) {     
    return res.status(500).json(error)
  }
}

export const signin = async (req, res) => {
  try {
    const userLogged = await userInstance.login(req.body.username, req.body.password);
    if (userLogged > 400) {
      return res.status(userLogged).json({
        token: null,
        message: 'Las credenciales ingresadas no son correctas por favor intentelo de nuevo',
      });
    }
    const token = jwt.sign({ id: userLogged.username }, process.env.SECRETPRIVATEKEY, { expiresIn: EXPIRATION_TIME, })
    return res.json({
      msg: 'Inicio de sesion correcto',
      email: userLogged.username,
      token
    });
  } catch (error) {
    return res.status(400).json({error, message: 'Error al iniciar sesion'})
  }
}