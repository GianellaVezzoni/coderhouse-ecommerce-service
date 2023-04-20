import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const {Schema, model} = mongoose;

let SALT_WORK_FACTOR = 12;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    index: true,
    unique: true
  },
  firstname: {
    type: String,
    index: true
  },
  lastname: {
    type: String,
    index: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
  },
  roles: [{
    type: String,
    ref: 'Role'
  }]
});

UserSchema.statics.encryptPassword = async (password) => {
  if (process.env.NODE_ENV === 'test') {
      SALT_WORK_FACTOR = 1;
  }
  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  return await bcrypt.hash(password, salt);
}

UserSchema.statics.comparePasswordAndHash = async (password, newPassword) => {
  // Compara las contraseñas proporcionadas
  return await bcrypt.compare(password, newPassword)
}

export default model('User', UserSchema)