import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import PermissionsRepository from "../repositories/PermissionsRepository";
import RolesRepository from "../repositories/RolesRepository";


class RoleController {

    async index (request: Request, response: Response) {
        const roleRepository = getCustomRepository(RolesRepository);
        const roles = await roleRepository.find();
        
        if(roles.length == 0 ){
            return response.status(201).json({message: "Nenhum registro."});
        }

        return response.status(201).json(roles);
    }

    async create (request: Request, response: Response) {
        const roleRepository = getCustomRepository(RolesRepository);
        const permissionRepository = getCustomRepository(PermissionsRepository);

        const {name, description, permissions} = request.body;
        const roleExists = await roleRepository.findOne({name});

        if(roleExists){
            return response.status(400).json({message: "Role já existe"})
        }

        const permissionsExists = await permissionRepository.findByIds(permissions);

        const role = roleRepository.create({name, description, permissions: permissionsExists});
        await roleRepository.save(role);

        return response.status(201).json(role);
        
    }
}

export default new RoleController;