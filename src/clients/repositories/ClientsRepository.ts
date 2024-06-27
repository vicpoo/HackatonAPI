import { ResultSetHeader } from 'mysql2';
import connection from '../../shared/config/database';
import { Clients } from '../models/Clients';

export class ClientsRepository {

  public static async findAll(): Promise<Clients[]> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT clients_id, fullname, address FROM clients', (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const clients: Clients[] = results as Clients[];
          resolve(clients);
        }
      });
    });
  }

  public static async findById(clients_id: number): Promise<Clients | null> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM clients WHERE clients_id = ?', [clients_id], (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const clients: Clients[] = results as Clients[];
          if (clients.length > 0) {
            resolve(clients[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async findByFullName(fullName: string): Promise<Clients | null> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM clients WHERE fullname = ?', [fullName], (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const clients: Clients[] = results as Clients[];
          if (clients.length > 0) {
            resolve(clients[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async createClients(clients: Clients): Promise<Clients> {
    const query = 'INSERT INTO clients (fullname, email, phone, address, created_at, created_by, updated_at, updated_by, deleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?)';
    console.log(clients);
    return new Promise((resolve, reject) => {
      connection.execute(query, [ clients.fullname, clients.email, clients.phone, clients.address ,clients.created_at, clients.created_by, clients.updated_at, clients.updated_by, clients.deleted], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          const createdClientsId = result.insertId;
          const createdClients: Clients = { ...clients, clients_id: createdClientsId };
          resolve(createdClients);
        }
      });
    });
  }

  public static async updateClients(clients_id: number, clientsData: Clients): Promise<Clients | null> {
    const query = 'UPDATE clients SET fullname = ?, email = ?, phone = ?, address = ?, updated_at = ?, updated_by = ?, deleted = ? WHERE clients_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [clientsData.fullname, clientsData.address, clientsData.phone, clientsData.email,clientsData.updated_at, clientsData.updated_by, clientsData.deleted, clients_id], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          if (result.affectedRows > 0) {
            const updatedClients: Clients = { ...clientsData, clients_id: clients_id };
            resolve(updatedClients);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async deleteClients(clients_id: number): Promise<boolean> {
    const query = 'DELETE FROM clients WHERE clients_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [clients_id], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          if (result.affectedRows > 0) {
            resolve(true); // Eliminación exitosa
          } else {
            resolve(false); // Si no se encontró el usuario a eliminar
          }
        }
      });
    });
  }

}