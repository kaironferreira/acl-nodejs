import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import {v4 as uuid} from "uuid";
import Permission from "./Permission";

@Entity("roles")
class Role {

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

    @ManyToMany(() => Permission)
    @JoinTable({
        name: "permissions_roles",
        joinColumns: [{name: "role_id"}],
        inverseJoinColumns: [{name: "permission_id"}],
    })
    
    permissions: Permission[];

    constructor(){
        if(!this.id){
            this.id = uuid();
        }
    }
}

export default Role;
