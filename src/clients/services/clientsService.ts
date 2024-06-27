import { ClientsRepository } from "../repositories/ClientsRepository";
import { Clients } from "../models/Clients";
import { DateUtils } from "../../shared/utils/DateUtils";
import dotenv from 'dotenv';

dotenv.config();


export class clientsService {

    public static async getAllClients(): Promise<Clients[]> {
        try{
            return await ClientsRepository.findAll();
        }catch (error: any){
            throw new Error(`Error al obtener los clientes: ${error.message}`);
        }
    }

    public static async getClientsById(clientsId: number): Promise<Clients | null> {
        try{
            return await ClientsRepository.findById(clientsId);
        }catch (error: any){
            throw new Error(`Error al encontrar cliente: ${error.message}`);
        }
    }

    public static async getClientsByFullName(fullName: string): Promise<Clients | null> {
        try{
            return await ClientsRepository.findByFullName(fullName);
        }catch (error: any){
            throw new Error(`Error al encontrar cliente: ${error.message}`);
        }
    }

    public static async addClients(clients: Clients) {
        try {
            clients.created_at = DateUtils.formatDate(new Date());
            clients.updated_at = DateUtils.formatDate(new Date());
            return await ClientsRepository.createClients(clients);
        } catch (error: any) {
            throw new Error(`Error al crear clientes: ${error.message}`);
        }
    }

    public static async modifyClients(clientsId: number, clientsData: Clients){
        try{
            const clientsFinded =  await ClientsRepository.findById(clientsId);

            if(clientsFinded){
                if(clientsData.fullname){
                    clientsFinded.fullname = clientsData.fullname;
                }
                if(clientsData.email){
                    clientsFinded.email = clientsData.email;
                }
                if(clientsData.phone){
                    clientsFinded.phone = clientsData.phone;
                }
                if(clientsData.address){
                clientsFinded.address = clientsData.address;
                }
                if(clientsData.deleted){
                    clientsFinded.deleted = clientsData.deleted;
                }
            }else{
                return null;
            }
            clientsFinded.updated_by = clientsData.updated_by
            clientsFinded.updated_at = DateUtils.formatDate(new Date());
            return await ClientsRepository.updateClients(clientsId, clientsFinded);
        }catch (error: any){
            throw new Error(`Error al modificar cliente: ${error.message}`);
        }
    }

    public static async deleteClients(clientsId: number): Promise<boolean> {
        try{
            return await ClientsRepository.deleteClients(clientsId);
        }catch (error: any){
            throw new Error(`Error al eliminar cliente: ${error.message}`);
        }
    }

}