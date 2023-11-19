import express from 'express';
import { productRouter } from './products/products.router.js';
import { cartRouter } from './cart/cart.router.js';

const app = express();

const PORT = 8080;
app.use(express.json())


app.listen(PORT, ()=>{console.log(`el servido esta escuchando en el puerto ${PORT}`)})

app.use(productRouter)
app.use(cartRouter)