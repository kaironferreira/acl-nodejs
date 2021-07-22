import { EntityRepository, Repository } from "typeorm";
import Permission from "../models/Permission";
import Product from "../models/Product";

@EntityRepository(Product)
class ProductsRepository extends Repository<Product> {

}

export default ProductsRepository;