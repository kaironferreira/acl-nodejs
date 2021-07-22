import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import UserRepository from "../repositories/UsersRepository";
import hash from "bcryptjs";
import RolesRepository from "../repositories/RolesRepository";

interface IUser {
    id: string;
    name: string;
    email: string;
    password?: string;
    created_at: Date;
    updated_at: Date;
}

class UserController {

    async index (request: Request, response: Response) {
        const userRepository = getCustomRepository(UserRepository);
        const users = await userRepository.find({relations: ["roles"]});


        return response.status(201).json(users);
    }



    async create (request: Request, response: Response) {
        const userRepository = getCustomRepository(UserRepository);
        const roleRepository = getCustomRepository(RolesRepository);

        const {name, email, password, roles} = request.body;
        const exitsUser = await userRepository.findOne({email});

        if(exitsUser){
            return response.status(400).json({message: "Usuário já existe"})
        }

        const passwordHashed = await hash.hash(password, 8);

        const rolesExists = await roleRepository.findByIds(roles);


        const user: IUser = userRepository.create({name, email, password: passwordHashed, roles: rolesExists});

        await userRepository.save(user);

        delete user.password;

        return response.status(201).json(user);
        
    }
}

export default new UserController;