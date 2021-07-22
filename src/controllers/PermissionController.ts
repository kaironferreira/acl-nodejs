import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import PermissionsRepository from "../repositories/PermissionsRepository";


class PermissionController {

    async index (request: Request, response: Response) {
        const permissionRepository = getCustomRepository(PermissionsRepository);
        const permissions = await permissionRepository.find();
        
        if(permissions.length == 0 ){
            return response.status(201).json({message: "Nenhum registro."});
        }

        return response.status(201).json(permissions);
    }

    async create (request: Request, response: Response) {
        const permissionRepository = getCustomRepository(PermissionsRepository);

        const {name, description} = request.body;
        const permissionExists = await permissionRepository.findOne({name});

        if(permissionExists){
            return response.status(400).json({message: "Permission já existe"})
        }

        const permission = permissionRepository.create({name, description});
        await permissionRepository.save(permission);

        return response.status(201).json(permission);
        
    }
}

export default new PermissionController;