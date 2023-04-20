import User from '../models/User.js';

export const getAllUsers = async (_, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({
      msg: 'Usuarios encontrados',
      data: users
    });
  } catch (err) {
    res.status(400).json({
      msg: 'Error al traer los usuarios',
      err: err
    });
  }
}

export const createUser = async (req, res) => {
  try {
      const { username, firstname, lastname, password, phone, roles } = req.body
      const newUser = new User({
          username,
          firstname,
          lastname,
          password: await User.encryptPassword(password),
          phone,
          roles
      })
      const user = await newUser.save();
      res.status(201).json({
        msg: 'Usuario creado',
        data: user
      })
  } catch (err) {
      res.status(400).json({
        msg: 'Error al crear el usuario',
        err: err
      });
  }
}

export const getUserById = async (req, res) => {
  try {
      const userFounded = await User.findById(req.params.userId);
      res.status(200).json({
        msg: 'Usuario encontrado',
        data: userFounded
      })
  } catch (err) {
      res.status(400).json({
        msg: 'Error al obtener el usuario',
        err: err
      })
  }
}

export const updateUser = async (req, res) => {
  try {
    const { firstname, lastname, phone } = req.body
    const updatedUser = await User.findByIdAndUpdate(req.params.userId, { firstname, lastname, phone }, { new: true });
    res.status(200).json({
      msg: 'Usuario actualizado',
      data: updatedUser
    });
  } catch (err) {
    res.status(400).json({
      msg: 'Error al actualizar el usuario',
      err: err
    })
  }
}

export const deleteUser = async (req, res) => {
  try {
    const updatedUser = await User.delete(req.params.userId);
    res.status(200).json({
      msg: 'Usuario eliminado',
      data: updatedUser
    });
  } catch (err) {
    res.status(400).json({
      msg: 'Error al eliminar el usuario',
      err: err
    })
  }
}