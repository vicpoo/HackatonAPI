import { RolRepository } from "../repositories/rol_userRepository";
import { Rol } from "../models/rol_user";
import { DateUtils } from "../../shared/utils/DateUtils";
import dotenv from 'dotenv';

dotenv.config();

export class rolService {

    public static async getAllRol(): Promise<Rol[]> {
        try{
            return await RolRepository.findAll();
        }catch (error: any){
            throw new Error(`Error al obtener todos los roles: ${error.message}`);
        }
    }

    public static async getRolById(rolId: number): Promise<Rol | null> {
        try{
            return await RolRepository.findById(rolId);
        }catch (error: any){
            throw new Error(`Error al encontrar el rol: ${error.message}`);
        }
    }


    public static async addRol(rol: Rol) {
        try {
            rol.created_at = DateUtils.formatDate(new Date());
            rol.updated_at = DateUtils.formatDate(new Date());
            return await RolRepository.createRol(rol);
        } catch (error: any) {
            throw new Error(`Error al crear el nuevo rol: ${error.message}`);
        }
    }

    public static async modifyRol(rolId: number, rolData: Rol){
        try{
            const rolFinded =  await RolRepository.findById(rolId);

            if(rolFinded){
                if(rolData.title){
                    rolFinded.title = rolData.title;
                }
                if(rolData.description){
                    rolFinded.description = rolData.description;
                }
                if(rolData.deleted){
                    rolFinded.deleted = rolData.deleted;
                }
            }else{
                return null;
            }
            rolFinded.updated_by = rolData.updated_by
            rolFinded.updated_at = DateUtils.formatDate(new Date());
            return await RolRepository.updateRol(rolId, rolFinded);
        }catch (error: any){
            throw new Error(`Error al modificar el rol: ${error.message}`);
        }
    }

    public static async deleteRol(rolId: number): Promise<boolean> {
        try{
            return await RolRepository.deleteRol(rolId);
        }catch (error: any){
            throw new Error(`Error al eliminar el rol: ${error.message}`);
        }
    }

}