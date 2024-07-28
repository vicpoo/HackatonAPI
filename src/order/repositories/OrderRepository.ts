import { ResultSetHeader } from 'mysql2';
import connection from '../../shared/config/database';
import { Order } from '../models/Order';

export class OrderRepository {

  public static async findAll(): Promise<Order[]> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT order_id, date_orders, client_id_fk FROM `order`', (error, results) => {
        if (error) {
          reject(error);
        } else {
          const orders: Order[] = results as Order[];
          resolve(orders);
        }
      });
    });
  }

  public static async findById(order_id: number): Promise<Order | null> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT order_id, date_orders, client_id_fk FROM `order` WHERE order_id = ?', [order_id], (error, results) => {
        if (error) {
          reject(error);
        } else {
          const orders: Order[] = results as Order[];
          if (orders.length > 0) {
            resolve(orders[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async createOrder(order: Order): Promise<Order> {
    const query = 'INSERT INTO `order` (date_orders, client_id_fk) VALUES (?, ?)';
    return new Promise((resolve, reject) => {
      connection.execute(query, [order.date_orders, order.client_id_fk], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          const createdOrderId = result.insertId;
          const createdOrder: Order = { ...order, order_id: createdOrderId };
          resolve(createdOrder);
        }
      });
    });
  }

  public static async addCoffeeToOrder(orderId: number, coffeeId: number, quantity: number): Promise<void> {
    const query = 'INSERT INTO order_coffee (order_id, coffee_id, quantity) VALUES (?, ?, ?)';
    return new Promise((resolve, reject) => {
      connection.execute(query, [orderId, coffeeId, quantity], (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }

  public static async deleteCoffeesFromOrder(orderId: number): Promise<void> {
    const query = 'DELETE FROM order_coffee WHERE order_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [orderId], (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }

  public static async deleteOrder(order_id: number): Promise<boolean> {
    const query = 'DELETE FROM `order` WHERE order_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [order_id], (error) => {
        if (error) {
          reject(error);
        } else {
          resolve(true);
        }
      });
    });
  }

  public static async updateOrder(orderId: number, order: Order): Promise<void> {
    const query = 'UPDATE `order` SET date_orders = ?, client_id_fk = ? WHERE order_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [order.date_orders, order.client_id_fk, orderId], (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }
}
