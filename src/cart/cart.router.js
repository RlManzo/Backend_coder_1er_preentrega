import { ProductCart } from "./ProductCart.js";
import { Router } from "express";
import { createRequire } from "module"


const require = createRequire(import.meta.url)
const cartJson = require("../cart.json")
export const cartRouter = Router();
const cartProduct = ProductCart;
const cart = new cartProduct();



cartRouter.post('/cart', (req, res)=>{ 
    cartJson.push(cart.addCarrito())
    res.json(cartJson)
})




//Agregar producto a carrito por id
cartRouter.post('/cart/agregar/:pid', (req,res)=>{  
        const pId = parseInt(req.params.pid)
        cartJson.push(cart.addProduct(123))
        res.json(cartJson)    
})

//funcion para filtrar por id.
cartRouter.get('/cart/:pid',(req,res)=>{ 
    const pId = parseInt(req.params.pid)
    const findId = cartJson.find(product => product.id === pId)
    if(findId){
      res.json({findId})
    }
    res.send({error:"id no existente"})   
 }); 
 