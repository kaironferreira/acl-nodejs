import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import UserRepository from "../repositories/UsersRepository";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


class AuthController {
    async authenticate(request: Request, response: Response){
        const {email, password} = request.body;
        const userRepository = getCustomRepository(UserRepository);
        const user = await userRepository.findOne({email}, {relations: ["roles"]});

        if(!user){
            return response.status(401).json({message: "Usuário não encontrado"});
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if(!isValidPassword){
            return response.status(400).json({message: "Usuário ou senha inválido"});
        }

        const token = jwt.sign({id: user.id}, "d80ff5c31633c889249c49b801fad25c", { expiresIn: '1d'});

        return response.json({user, token});
    }
}


export default new AuthController;