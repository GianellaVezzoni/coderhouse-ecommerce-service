import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import mongoose from './config/mongoConnection.js';
import userRoutes from './routes/user.js';
import productRoutes from './routes/product.js';
import cartProducts from './routes/cart.js';
import testConnection from './routes/testConnection.js';
import categoriesRoutes from './routes/categories.js';
import ordersRoutes from './routes/order.js';

const server = express();
const port = process.env.PORT || 8080;

dotenv.config();
mongoose.then(() => console.log('database connected'));

if (process.env.NODE_ENV === 'dev') {
  server.use(morgan('short'));
}

server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(cors());

server.use('/api/v1/', userRoutes);
server.use('/api/v1/', productRoutes);
server.use('/api/v1/', cartProducts);
server.use('/api/v1/', categoriesRoutes);
server.use('/api/test/', testConnection);
server.use('/api/v1/', ordersRoutes);

// Endpoint para testear el funcionamiento del back
server.get('/ping', (_, res) => {
  res.json('pong');
});

server.get('/', (_, res) => {
  res.redirect('/api/v1/products');
});

server.listen(port, () => {
  console.log(`El servidor se esta ejecutandose en el puerto ${port}`)
})

export default server;