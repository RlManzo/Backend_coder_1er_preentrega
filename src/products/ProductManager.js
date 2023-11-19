import fs from 'fs'


export class ProductManager {

    constructor() {

        this.products = [];

        this.path = "./products.json";

    };


    async addProduct(title, description, price, thumbnail, code, stock) {

        const existingProduct = this.products.find((product) => product.code === code); 

        if (existingProduct) {

            console.log("Código repetido");

            return;

        };

        const product = {

            title,

            description,

            price,

            thumbnail,

            code,

            stock,

        };



        if (this.products.length === 0) {

            product.id = 1;

        } else {

            product.id = this.products[this.products.length - 1].id + 1;

        };



        this.products.push(product);

        await fs.promises.writeFile(this.path, JSON.stringify(this.products));

    };



    // Modificaciones de convención.

    async getProducts() {

        const products = await fs.promises.readFile(this.path, "utf-8");

        const parsedProducts = await JSON.parse(products); 
        console.log(parsedProducts);

        return parsedProducts;

    };


    async getProductById(productId) {

        const products = await this.getProducts(); 

        const product = products.find((product) => product.id == productId); 

        if (product) {

            console.log(product);

        } else {

            console.log("Producto no encontrado");

        };

    };

    async updateProduct(id, updatedProduct) {

        const products = await this.getProducts();

        const index = products.findIndex((product) => product.id == id);

        if (index === -1) {

            console.log("Producto no encontrado");
             return;

        };
         products[index] = updatedProduct;
          await fs.promises.writeFile(this.path, JSON.stringify(products));

    };

    async deleteProduct(productId) {

        const products = await this.getProducts(); 
       const index = products.findIndex((product) => product.id === productId); 

        if (index === -1) {
            console.log("Producto no encontrado");
            return;
        };
        products.splice(index, 1);
        await fs.promises.writeFile(this.path, JSON.stringify(products));
              console.log("Producto eliminado");
    };

};