import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import ProductsRepository from "../repositories/ProductsRepository";

class ProductController {

    async index (request: Request, response: Response) {
        const productRepository = getCustomRepository(ProductsRepository);
        const products = await productRepository.find();
        
        if(products.length == 0 ){
            return response.status(201).json({message: "Nenhum registro."});
        }

        return response.status(201).json(products);
    }

    async create (request: Request, response: Response) {
        const productRepository = getCustomRepository(ProductsRepository);
        const {name, description} = request.body;
        const productsExists = await productRepository.findOne({name});

        if(productsExists){
            return response.status(400).json({message: "Produto já existe"})
        }

        const product = productRepository.create({name, description});
        await productRepository.save(product);

        return response.status(201).json(product);
    }


}

export default new ProductController;