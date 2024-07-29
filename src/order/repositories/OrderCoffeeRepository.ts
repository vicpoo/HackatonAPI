import { ResultSetHeader } from 'mysql2';
import connection from '../../shared/config/database';
import { OrderCoffee } from '../models/OrderCoffee';

export class OrderCoffeeRepository {
  public static async findAll(): Promise<OrderCoffee[]> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM order_coffee', (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const orderCoffees: OrderCoffee[] = results as OrderCoffee[];
          resolve(orderCoffees);
        }
      });
    });
  }

  public static async findById(order_coffee_id: number): Promise<OrderCoffee | null> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM order_coffee WHERE order_coffee_id = ?', [order_coffee_id], (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const orderCoffee: OrderCoffee[] = results as OrderCoffee[];
          if (orderCoffee.length > 0) {
            resolve(orderCoffee[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async createOrderCoffee(orderCoffee: OrderCoffee): Promise<OrderCoffee> {
    const query = 'INSERT INTO order_coffee (order_id, coffee_id, quantity, price, created_at, created_by, updated_at, updated_by, deleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    return new Promise((resolve, reject) => {
      connection.execute(query, [orderCoffee.order_id, orderCoffee.coffee_id, orderCoffee.quantity, orderCoffee.price, orderCoffee.created_at, orderCoffee.created_by, orderCoffee.updated_at, orderCoffee.updated_by, orderCoffee.deleted], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          const createdOrderCoffeeId = result.insertId;
          const createdOrderCoffee: OrderCoffee = { ...orderCoffee, order_coffee_id: createdOrderCoffeeId };
          resolve(createdOrderCoffee);
        }
      });
    });
  }

  public static async updateOrderCoffee(order_coffee_id: number, orderCoffeeData: OrderCoffee): Promise<OrderCoffee | null> {
    const query = 'UPDATE order_coffee SET order_id = ?, coffee_id = ?, quantity = ?, price = ?, updated_at = ?, updated_by = ?, deleted = ? WHERE order_coffee_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [orderCoffeeData.order_id, orderCoffeeData.coffee_id, orderCoffeeData.quantity, orderCoffeeData.price, orderCoffeeData.updated_at, orderCoffeeData.updated_by, orderCoffeeData.deleted, order_coffee_id], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          if (result.affectedRows > 0) {
            const updatedOrderCoffee: OrderCoffee = { ...orderCoffeeData, order_coffee_id: order_coffee_id };
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
            resolve(true);
          } else {
            resolve(false);
          }
        }
      });
    });
  }
}
