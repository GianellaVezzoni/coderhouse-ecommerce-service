import mongoose, { Types } from 'mongoose';
const {Schema, model} = mongoose;

const OrderSchema = new Schema({
  id: {
    type: Types.ObjectId,
  },
  orderNumber: {
    type: Schema.Types.Number,
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
  status: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  email: {
    type: String,
    required: true
  }
});

export default model('Order', OrderSchema)