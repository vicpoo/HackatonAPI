import { ResultSetHeader } from 'mysql2';
import connection from '../../shared/config/database';
import { Client } from '../models/Client';

export class ClientRepository {

  public static async findAll(): Promise<Client[]> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT client_id, firstname, lastname, address, email, phone, updated_by FROM client', (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const client: Client[] = results as Client[];
          resolve(client);
        }
      });
    });
  }

  public static async findById(client_id: number): Promise<Client | null> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT client_id, firstname, lastname, address, email, phone, updated_by FROM client WHERE client_id = ?', [client_id], (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const client: Client[] = results as Client[];
          if (client.length > 0) {
            resolve(client[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async createClient(client: Client): Promise<Client> {
    const query = 'INSERT INTO client(firstname, lastname, email, phone, address, created_at, created_by, updated_at, updated_by, deleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    return new Promise((resolve, reject) => {
      connection.execute(query, [client.firstname, client.lastname, client.email, client.phone, client.address, client.created_at, client.created_by, client.updated_at, client.updated_by, client.deleted], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          const createdClientId = result.insertId;
          const createdClient: Client = { ...client, client_id: createdClientId };
          resolve(createdClient);
        }
      });
    });
  }

  public static async updateClient(client_id: number, clientData: Client): Promise<Client | null> {
    const query = 'UPDATE client SET firstname = ?, lastname = ?, email = ?, phone = ?, address = ?, updated_at = ?, updated_by = ?, deleted = ? WHERE client_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [clientData.firstname, clientData.lastname, clientData.email, clientData.phone, clientData.address, clientData.updated_at, clientData.updated_by, clientData.deleted, client_id], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          if (result.affectedRows > 0) {
            const updatedClient: Client = { ...clientData, client_id: client_id };
            resolve(updatedClient);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async deleteClient(client_id: number): Promise<boolean> {
    const query = 'DELETE FROM client WHERE client_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [client_id], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          if (result.affectedRows > 0) {
            resolve(true); // Eliminación exitosa
          } else {
            resolve(false); // Si no se encontró el cliente a eliminar
          }
        }
      });
    });
  }
}
