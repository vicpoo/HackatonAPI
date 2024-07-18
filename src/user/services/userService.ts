import { UserRepository } from "../repositories/UserRepository";
import { User } from "../models/User";
import { DateUtils } from "../../shared/utils/DateUtils";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secretKey = process.env.SECRET || ""; // tokens
const saltRounds = 10; // HASHEOS

export class userService {

    public static async login(username: string, password: string){
        try{
            const user = await this.getUserByUsername(username);
            if(!user){
                return null;
            }
            const passwordMatch = await bcrypt.compare(password, user.password); // HASEAR CONTRAS

            if (!passwordMatch) {
                return null;
            }

            const payload = {
                user_id: user.user_id,
                rol_id_fk: user.rol_id_fk,
                username: user.username,
                firstname: user.firstname,
                lastname: user.lastname
            };
            return await jwt.sign(payload, secretKey, { expiresIn: '2 days' }); // duracion de la secret Key

        }catch (error: any){
            throw new Error(`Error al logearse: ${error.message}`);
        }

    }

    public static async getAllUser(): Promise<User[]> {
        try{
            return await UserRepository.findAll();
        }catch (error: any){
            throw new Error(`Error al obtener empleados: ${error.message}`);
        }
    }

    public static async getUserById(userId: number): Promise<User | null> {
        try{
            return await UserRepository.findById(userId);
        }catch (error: any){
            throw new Error(`Error al encontrar empleado: ${error.message}`);
        }
    }

    public static async getUserByUsername(username: string): Promise<User | null> {
        try{
            return await UserRepository.findByUsername(username);
        }catch (error: any){
            throw new Error(`Error al encontrar empleado: ${error.message}`);
        }
    }

    public static async addUser(user: User) {
        try {
            const salt = await bcrypt.genSalt(saltRounds);
            user.created_at = DateUtils.formatDate(new Date());
            user.updated_at = DateUtils.formatDate(new Date());
            user.password = await bcrypt.hash(user.password, salt);
            return await UserRepository.createUser(user);
        } catch (error: any) {
            throw new Error(`Error al crear empleado: ${error.message}`);
        }
    }

    public static async modifyUser(userId: number, userData: User){
        try{
            const userFinded =  await UserRepository.findById(userId);
            const salt = await bcrypt.genSalt(saltRounds);

            if(userFinded){
                if(userData.firstname){
                    userFinded.firstname = userData.firstname;
                }
                if(userData.lastname){
                    userFinded.lastname = userData.lastname;
                }
                if(userData.username){
                    userFinded.username = userData.username;
                }
                if(userData.password){
                    userFinded.password = await bcrypt.hash(userData.password, salt);
                }
                if(userData.email){
                    userFinded.email = userData.email;
                }                
                if(userData.rol_id_fk){
                    userFinded.rol_id_fk = userData.rol_id_fk;
                }
                if(userData.deleted){
                    userFinded.deleted = userData.deleted;
                }
            }else{
                return null;
            }
            userFinded.updated_by = userData.updated_by;
            userFinded.updated_at = DateUtils.formatDate(new Date());
            return await UserRepository.updateUser(userId, userFinded);
        }catch (error: any){
            throw new Error(`Error al modificar empleado: ${error.message}`);
        }
    }

    public static async deleteUser(userId: number): Promise<boolean> {
        try{
            return await UserRepository.deleteUser(userId);
        }catch (error: any){
            throw new Error(`Error al eliminar empleado: ${error.message}`);
        }
    }

}
