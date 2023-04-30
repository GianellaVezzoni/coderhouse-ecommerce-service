import UserRepo from '../repos/User.js';
import {encryptPassowrd, comparePasswordAndHash} from '../utils/encryptPassword.js';

const userInstance = new UserRepo();

export default class UserService {
  async getAll(){
    return await userInstance.getAll();
  }

  async getOne(id){
    return await userInstance.getById(id);
  }

  async create(user){
    const userCreate = await userInstance.save(user);
    return userCreate ?? null;
  }

  async deleteOne(id){
    return await userInstance.deleteById(id);
  }

  async update(id, user){
    return await userInstance.update(id, user);
  }

  async findOneByUsername(username){
    return await userInstance.getByUsername(username);
  }

  async login(username, password){
    const user = await userInstance.getByUsername(username);
    if(user){
      const passwordValid = comparePasswordAndHash(user.password, password);
      if(passwordValid){
        return user;
      }
      return 401;
    }else{
      return 400;
    }
  }

  async signUp(user){
    const passwordEncrypted = await encryptPassowrd(user.password);
    const objToSave = {
      ...user,
      password: passwordEncrypted
    };
    return await userInstance.save(objToSave);
  }
}