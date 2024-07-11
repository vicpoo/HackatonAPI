import { ResultSetHeader } from 'mysql2';
import connection from '../../shared/config/database';
import { Order_coffee } from '../models/order_coffee';

export class Order_coffeeRepository {

  public static async findAll(): Promise<Order_coffee[]> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT order_coffee_id, coffee_id_fk, order_id_fk,quantify  FROM order_coffee', (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const order_coffee: Order_coffee[] = results as Order_coffee[];
          resolve(order_coffee);
        }
      });
    });
  }

  public static async findById(order_coffee_id: number): Promise<Order_coffee | null> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM order_coffee WHERE order_coffee_id = ?', [order_coffee_id], (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const order_coffee: Order_coffee[] = results as Order_coffee[];
          if (order_coffee.length > 0) {
            resolve(order_coffee[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  }


  public static async createOrderCoffee(order_coffee: Order_coffee): Promise<Order_coffee> {
    const query = 'INSERT INTO order_coffee (order_id_fk, coffee_id_fk, quantify,created_at, created_by, updated_at, updated_by, deleted) VALUES (?, ?, ?, ?, ?, ?, ?,?)';
    console.log(order_coffee);
    return new Promise((resolve, reject) => {
      connection.execute(query, [order_coffee.order_id_fk, order_coffee.coffee_id_fk, order_coffee.quantify,order_coffee.created_at, order_coffee.created_by, order_coffee.updated_at, order_coffee.updated_by, order_coffee.deleted], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          const createdOrderCoffeeId = result.insertId;
          const createdOrderCoffee: Order_coffee = { ...order_coffee, order_coffee_id: createdOrderCoffeeId };
          resolve(createdOrderCoffee);
        }
      });
    });
  }

  public static async updateOrderCoffee(order_coffee_id: number, orderCoffeeData: Order_coffee): Promise<Order_coffee | null> {
    const query = 'UPDATE order_coffee SET order_id_fk = ?, coffee_id_fk =  ? ,quantify = ?, updated_at = ?, updated_by = ?, deleted = ? WHERE order_coffee_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [orderCoffeeData.coffee_id_fk, orderCoffeeData.order_id_fk,orderCoffeeData.quantify, orderCoffeeData.updated_at, orderCoffeeData.updated_by, orderCoffeeData.deleted, order_coffee_id], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          if (result.affectedRows > 0) {
            const updatedOrderCoffee: Order_coffee = { ...orderCoffeeData, order_coffee_id: order_coffee_id };
            resolve(updatedOrderCoffee);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async deleteOrderCoffee(order_coffee_id: number): Promise<boolean> {
    const query = 'DELETE FROM order_coffee WHERE order_coffee_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [order_coffee_id], (error, result: ResultSetHeader) => {
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
