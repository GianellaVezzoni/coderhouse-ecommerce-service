import mongoose from 'mongoose';
const {Schema, model} = mongoose;

const OrderSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
  },
  message: {
    required: true,
    type: Schema.Types.String,
  }
});

export default model('Order', OrderSchema)