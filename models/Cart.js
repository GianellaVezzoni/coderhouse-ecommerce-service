import mongoose from 'mongoose';
const {Schema, model} = mongoose;

const CartSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  products: [
    {
      id: {
        type: Schema.Types.ObjectId,
        ref: "Product"
      }
    }
  ],
  createdAt: {
    type: Date,
  },
});

export default model('Cart', CartSchema)