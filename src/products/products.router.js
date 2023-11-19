import { ProductManager } from "./ProductManager.js";
import { Router } from "express";
import { createRequire } from "module"

const require = createRequire(import.meta.url)
const productJson = require("../products.json")

//instancia de productManager
const products = ProductManager;

const product = new products();

product.addProduct("arroz", "marolio", 200, "sin imagen", 123213, 10);
product.addProduct("yerba", "marolio", 500, "sin imagen", 121344, 5);
product.addProduct("fideos", "303", 800, "sin imagen", 121347, 15);
product.addProduct("pan lactal", "media", 900, "sin imagen", 121349, 3);
product.addProduct("papel higienico", "Higienol", 1500, "sin imagen", 121322, 10);

export const productRouter = Router();
//gets de product manager

//Ruta raiz
productRouter.get('/', (req, res)=> {
  res.json(productJson)
}) 

//Funcion para buscar por query params por cantidad ingresando "?limit=1" o "?limit=2" o cualquier numero.
productRouter.get('/products',(req,res)=>{
    let limit = parseInt(req.query.limit)
    for(i=0;i<productJson.length;i++){  
  if(limit>productJson.length)break;
     res.send(productJson.slice(0,limit)) 
   }  
 });


//funcion para filtrar por id.
productRouter.get('/:pid',(req,res)=>{ 
   const pId = parseInt(req.params.pid)
   const findId = productJson.find(product => product.id === pId)
   if(findId){
     res.json({findId })
   }
   res.send({error:"id no existente"})   
}); 

productRouter.post('/', (req,res)=>{ 
    productJson.push(product.addProduct("azucar", "marolio", 700, "sin imagen", 123235, 2))
    res.json(productJson)
})