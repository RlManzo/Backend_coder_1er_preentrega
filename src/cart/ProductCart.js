import fs from 'fs'

export class ProductCart {
    
    constructor() {

        this.products = [];

        this.path = "./cart.json";

    };

    async addCarrito() {

        const product = {
            quantity : "",
            id: null

        };
        this.products.push(product);
        await fs.promises.writeFile(this.path, JSON.stringify(this.products));
        
    }    

    async addProduct(code) {

        const existingProduct = this.products.find((product) => product.code === code); 
             
        const product = {
            quantity : 1 
        };


        if (this.products.length === 0) {

            product.id = 1;
            

        } else if(existingProduct){
            
            quantity = +1;
            product.id = 1;
        }
        else{
            product.id = this.products[this.products.length - 1].id + 1;
            

        }



        this.products.push(product);

        await fs.promises.writeFile(this.path, JSON.stringify(this.products));

    };



};