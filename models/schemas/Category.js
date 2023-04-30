import mongoose, { Types } from 'mongoose';
const {Schema, model} = mongoose;

const CategorySchema = new Schema({
  id: {
    type: Types.ObjectId,
  },
  name: {
    type: String,
    required: true,
  },
});

export default model('Category', CategorySchema)