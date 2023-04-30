import mongoose, { Types } from 'mongoose';
const {Schema, model} = mongoose;

const UserSchema = new Schema({
  id: {
    type: Types.ObjectId,
  },
  username: {
    type: String,
    required: true,
    index: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
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

export default model('User', UserSchema)