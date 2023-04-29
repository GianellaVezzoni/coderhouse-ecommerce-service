import mongoose from 'mongoose';
const {Schema, model} = mongoose;

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  productFile: {
    type: String, 
    require: true, 
    max: 200
  },
  stock: {
    type: Number
  },
  categories: {
    type: Array
  }
});

export default model('Product', ProductSchema)