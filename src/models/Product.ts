import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import {v4 as uuid} from "uuid";


@Entity("products")
class Product {

    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
    

    constructor(){
        if(!this.id){
            this.id = uuid();
        }
    }
}

export default Product;
