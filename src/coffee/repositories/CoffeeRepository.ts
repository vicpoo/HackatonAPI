import { ResultSetHeader } from 'mysql2';
import connection from '../../shared/config/database';
import { Coffee } from '../models/Coffee';

export class CoffeeRepository {

  public static async findAll(): Promise<Coffee[]> {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT coffee_id, name, origin, height, qualification, price, inventory_quantity FROM coffee',
        (error: any, results) => {
          if (error) {
            reject(error);
          } else {
            const coffee: Coffee[] = results as Coffee[];
            resolve(coffee);
          }
        }
      );
    });
  }

  public static async findById(coffee_id: number): Promise<Coffee | null> {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT coffee_id, name, origin, height, qualification, price, inventory_quantity FROM coffee WHERE coffee_id = ?',
        [coffee_id],
        (error: any, results) => {
          if (error) {
            reject(error);
          } else {
            const coffee: Coffee[] = results as Coffee[];
            if (coffee.length > 0) {
              resolve(coffee[0]);
            } else {
              resolve(null);
            }
          }
        }
      );
    });
  }

  public static async findByName(Name: string): Promise<Coffee | null> {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT coffee_id, name, origin, height, qualification, price, inventory_quantity FROM coffee WHERE name = ?',
        [Name],
        (error: any, results) => {
          if (error) {
            reject(error);
          } else {
            const coffee: Coffee[] = results as Coffee[];
            if (coffee.length > 0) {
              resolve(coffee[0]);
            } else {
              resolve(null);
            }
          }
        }
      );
    });
  }

  public static async createCoffee(coffee: Coffee): Promise<Coffee> {
    const query = 'INSERT INTO coffee (name, origin, height, qualification, price, inventory_quantity, created_at, created_by, updated_at, updated_by, deleted) VALUES (?, ?, ?, ?, ?, ?, NOW(), ?, NOW(), ?, 0)';
    return new Promise((resolve, reject) => {
      connection.execute(query, [
        coffee.name, coffee.origin, coffee.height, coffee.qualification, coffee.price, coffee.inventory_quantity, coffee.created_by, coffee.updated_by
      ], (error, result: ResultSetHeader) => {
        if (error) {
          console.error("Error inserting coffee:", error); // Añadir un log de error
          reject(error);
        } else {
          const createdCoffeeId = result.insertId;
          const createdCoffee: Coffee = { ...coffee, coffee_id: createdCoffeeId };
          resolve(createdCoffee);
        }
      });
    });
  }

  public static async updateCoffee(coffee_id: number, coffeeData: Coffee): Promise<boolean> {
    const query =
      'UPDATE coffee SET name = ?, origin = ?, height = ?, qualification = ?, price = ?, inventory_quantity = ?, updated_at = NOW(), updated_by = ?, deleted = ? WHERE coffee_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(
        query,
        [
          coffeeData.name,
          coffeeData.origin,
          coffeeData.height,
          coffeeData.qualification,
          coffeeData.price,
          coffeeData.inventory_quantity,
          coffeeData.updated_by,
          coffeeData.deleted,
          coffee_id
        ],
        (error) => {
          if (error) {
            reject(error);
          } else {
            resolve(true); // Indicar éxito en la actualización
          }
        }
      );
    });
  }

  public static async deleteCoffee(coffee_id: number): Promise<boolean> {
    const query = 'DELETE FROM coffee WHERE coffee_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [coffee_id], (error) => {
        if (error) {
          reject(error);
        } else {
          resolve(true);
        }
      });
    });
  }

  public static async updateStock(coffee_id: number, newStock: number): Promise<boolean> {
    const query = 'UPDATE coffee SET inventory_quantity = ? WHERE coffee_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [newStock, coffee_id], (error) => {
        if (error) {
          reject(error);
        } else {
          resolve(true);
        }
      });
    });
  }
}
