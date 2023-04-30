import UserService from '../services/User.js';
const userServiceInstance = new UserService();

export const getAllUsers = async (_, res) => {
  try {
    const users = await userServiceInstance.getAll();
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
    const newUser = {
      username,
      firstname,
      lastname,
      password,
      phone,
      roles
    };
    const user = await userServiceInstance.create(newUser);
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
    const {userId} = req.params;
    const userFounded = await userServiceInstance.getOne(userId);
    res.status(200).json({
      msg: 'Usuario encontrado',
      data: userFounded
    })
  } catch (err) {
    res.status(400).json({
      msg: 'Error al obtener el usuario',
      err: err
    });
  }
}

export const updateUser = async (req, res) => {
  try {
    const { firstname, lastname, phone } = req.body
    const updatedUser = await userServiceInstance.update(req.params.userId, { firstname, lastname, phone });
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
    const updatedUser = await userServiceInstance.deleteOne(req.params.userId);
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