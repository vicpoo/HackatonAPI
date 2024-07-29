import { ResultSetHeader } from 'mysql2';
import connection from '../../shared/config/database';
import { OrderCoffee } from '../models/OrderCoffee';

export class OrderCoffeeRepository {
  
  public static async findAll(): Promise<OrderCoffee[]> {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM order_coffee WHERE deleted = 0',
        (error: any, results) => {
          if (error) {
            console.error("Error fetching order_coffee records:", error);
            reject(error);
          } else {
            const orderCoffee: OrderCoffee[] = results as OrderCoffee[];
            resolve(orderCoffee);
          }
        }
      );
    });
  }

  public static async findById(order_coffee_id: number): Promise<OrderCoffee | null> {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM order_coffee WHERE order_coffee_id = ? AND deleted = 0',
        [order_coffee_id],
        (error: any, results) => {
          if (error) {
            console.error("Error fetching order_coffee by ID:", error);
            reject(error);
          } else {
            const orderCoffee: OrderCoffee[] = results as OrderCoffee[];
            if (orderCoffee.length > 0) {
              resolve(orderCoffee[0]);
            } else {
              resolve(null);
            }
          }
        }
      );
    });
  }

  public static async createOrderCoffee(orderCoffee: OrderCoffee): Promise<OrderCoffee> {
    const query = 'INSERT INTO order_coffee (order_id, coffee_id, quantity, price, created_at, created_by, updated_at, updated_by, deleted) VALUES (?, ?, ?, ?, NOW(), ?, NOW(), ?, 0)';
    return new Promise((resolve, reject) => {
      connection.execute(query, [
        orderCoffee.order_id, 
        orderCoffee.coffee_id, 
        orderCoffee.quantity, 
        orderCoffee.price, 
        orderCoffee.created_by, 
        orderCoffee.updated_by
      ], (error, result: ResultSetHeader) => {
        if (error) {
          console.error("Error inserting order_coffee:", error);
          reject(error);
        } else {
          const createdOrderCoffeeId = result.insertId;
          const createdOrderCoffee: OrderCoffee = { ...orderCoffee, order_coffee_id: createdOrderCoffeeId };
          resolve(createdOrderCoffee);
        }
      });
    });
  }

  public static async updateOrderCoffee(order_coffee_id: number, orderCoffeeData: Partial<OrderCoffee>): Promise<boolean> {
    const query =
      'UPDATE order_coffee SET order_id = ?, coffee_id = ?, quantity = ?, price = ?, updated_at = NOW(), updated_by = ?, deleted = ? WHERE order_coffee_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(
        query,
        [
          orderCoffeeData.order_id,
          orderCoffeeData.coffee_id,
          orderCoffeeData.quantity,
          orderCoffeeData.price,
          orderCoffeeData.updated_by,
          orderCoffeeData.deleted ?? 0,
          order_coffee_id
        ],
        (error) => {
          if (error) {
            console.error("Error updating order_coffee:", error);
            reject(error);
          } else {
            resolve(true);
          }
        }
      );
    });
  }

  public static async deleteOrderCoffee(order_coffee_id: number): Promise<boolean> {
    const query = 'UPDATE order_coffee SET deleted = 1 WHERE order_coffee_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [order_coffee_id], (error) => {
        if (error) {
          console.error("Error deleting order_coffee:", error);
          reject(error);
        } else {
          resolve(true);
        }
      });
    });
  }
}