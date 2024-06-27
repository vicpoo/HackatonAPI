import { ClientRepository } from "../repositories/ClientRepository";
import { Client } from "../models/Client";
import { DateUtils } from "../../shared/utils/DateUtils";
import dotenv from 'dotenv';

dotenv.config();


export class clientService {

    public static async getAllClient(): Promise<Client[]> {
        try{
            return await ClientRepository.findAll();
        }catch (error: any){
            throw new Error(`Error al obtener los clientes: ${error.message}`);
        }
    }

    public static async getClientById(clientId: number): Promise<Client | null> {
        try{
            return await ClientRepository.findById(clientId);
        }catch (error: any){
            throw new Error(`Error al encontrar cliente: ${error.message}`);
        }
    }

    public static async getClientByFullName(fullName: string): Promise<Client | null> {
        try{
            return await ClientRepository.findByFullName(fullName);
        }catch (error: any){
            throw new Error(`Error al encontrar cliente: ${error.message}`);
        }
    }

    public static async addClient(client: Client) {
        try {
            client.created_at = DateUtils.formatDate(new Date());
            client.updated_at = DateUtils.formatDate(new Date());
            return await ClientRepository.createClient(client);
        } catch (error: any) {
            throw new Error(`Error al crear clientes: ${error.message}`);
        }
    }

    public static async modifyClient(clientId: number, clientData: Client){
        try{
            const clientFinded =  await ClientRepository.findById(clientId);

            if(clientFinded){
                if(clientData.fullname){
                    clientFinded.fullname = clientData.fullname;
                }
                if(clientData.email){
                    clientFinded.email = clientData.email;
                }
                if(clientData.phone){
                    clientFinded.phone = clientData.phone;
                }
                if(clientData.address){
                clientFinded.address = clientData.address;
                }
                if(clientData.deleted){
                    clientFinded.deleted = clientData.deleted;
                }
            }else{
                return null;
            }
            clientFinded.updated_by = clientData.updated_by
            clientFinded.updated_at = DateUtils.formatDate(new Date());
            return await ClientRepository.updateClient(clientId, clientFinded);
        }catch (error: any){
            throw new Error(`Error al modificar cliente: ${error.message}`);
        }
    }

    public static async deleteClient(clientId: number): Promise<boolean> {
        try{
            return await ClientRepository.deleteClient(clientId);
        }catch (error: any){
            throw new Error(`Error al eliminar cliente: ${error.message}`);
        }
    }

}