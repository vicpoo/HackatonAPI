import { ResultSetHeader } from 'mysql2';
import connection from '../../shared/config/database';
import { Rol } from '../models/rol_user';

export class RolRepository {

  public static async findAll(): Promise<Rol[]> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT rol_id, title, description FROM rol_user', (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const rol: Rol[] = results as Rol[];
          resolve(rol);
        }
      });
    });
  }

  public static async findById(rol_id: number): Promise<Rol | null> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM rol_user WHERE rol_id = ?', [rol_id], (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const rol: Rol[] = results as Rol[];
          if (rol.length > 0) {
            resolve(rol[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  }


  public static async createRol(rol: Rol): Promise<Rol> {
    const query = 'INSERT INTO rol_user (title, description, created_at, created_by, updated_at, updated_by, deleted) VALUES (?, ?, ?, ?, ?, ?, ?)';
    console.log(rol);
    return new Promise((resolve, reject) => {
      connection.execute(query, [rol.title, rol.description, rol.created_at, rol.created_by, rol.updated_at, rol.updated_by, rol.deleted], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          const createdRolId = result.insertId;
          const createdRol: Rol = { ...rol, rol_id: createdRolId };
          resolve(createdRol);
        }
      });
    });
  }

  public static async updateRol(rol_id: number, rolData: Rol): Promise<Rol | null> {
    const query = 'UPDATE rol_user SET title = ?, description = ?, updated_at = ?, updated_by = ?, deleted = ? WHERE rol_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [rolData.title, rolData.description, rolData.updated_at, rolData.updated_by, rolData.deleted, rol_id], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          if (result.affectedRows > 0) {
            const updatedRol: Rol = { ...rolData, rol_id: rol_id };
            resolve(updatedRol);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async deleteRol(rol_id: number): Promise<boolean> {
    const query = 'DELETE FROM rol_user WHERE rol_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [rol_id], (error, result: ResultSetHeader) => {
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
