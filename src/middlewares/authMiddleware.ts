import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { getCustomRepository } from "typeorm";
import User from "../models/User";
import UserRepository from "../repositories/UsersRepository";

interface TokenPayload {
    id: string;
    iat: number;
    exp: number;
}

async function authMiddleware(request:Request) : Promise<User | undefined>{
    const authHeader = request.headers.authorization || "";
    const userRepository = getCustomRepository(UserRepository);
    const [, token] = authHeader?.split(" ");

    const data = jwt.verify(token, "d80ff5c31633c889249c49b801fad25c");
    const { id } = data as TokenPayload;
    const user  = await userRepository.findOne(id, {relations: ['roles']});
    return user;
}

function is (role: String[]){
    const roleAuthorized = async (request: Request, response: Response, next: NextFunction) => {

        const {authorization} = request.headers;
        
        if(!authorization){
            return response.status(401).json({message: "Token Inválido"});
        }

        const user = await authMiddleware(request);
        const userRoles = user?.roles.map((role) => role.name);
        const rolesExists = userRoles?.some((r) => role.includes(r));

        if(rolesExists){
            return next();
        }

        return response.status(401).json({message:"Não autorizado!"})
    }
    
    return roleAuthorized;
}

export {is};