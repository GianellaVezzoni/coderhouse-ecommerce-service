import mongoose, { Types } from 'mongoose';
const {Schema, model} = mongoose;

const CartSchema = new Schema({
  id: {
    type: Types.ObjectId,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  products: [
    {
      id: {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: {
        type: Schema.Types.Number
      }
    }
  ],
  total: {
    type: Schema.Types.Number,
  },
  createdAt: {
    type: Date,
  },
});

export default model('Cart', CartSchema)