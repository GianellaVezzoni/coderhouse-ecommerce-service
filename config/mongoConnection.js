import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

export default mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true});
const database = mongoose.connection;

database.on('connect', error => {
  console.log(`Conectado a la base de datos`);
});

database.on('error', error => {
  console.log(`Error de conexión a la base de datos. ${error}`);
});