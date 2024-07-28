import { ResultSetHeader } from 'mysql2';
import connection from '../../shared/config/database';
import { Order } from '../models/Order';

export class OrderRepository {

  // Método para obtener todas las órdenes
  public static async findAll(): Promise<Order[]> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT order_id, date_orders, client_id FROM orders', (error, results) => {
        if (error) {
          reject(error);
        } else {
          const orders: Order[] = results as Order[];
          resolve(orders);
        }
      });
    });
  }

  // Método para obtener una orden por su ID
  public static async findById(order_id: number): Promise<Order | null> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT order_id, date_orders, client_id FROM orders WHERE order_id = ?', [order_id], (error, results) => {
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

  // Método para crear una nueva orden
  public static async createOrder(order: Order): Promise<Order> {
    const query = 'INSERT INTO orders (date_orders, client_id) VALUES (?, ?)';
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

  // Método para insertar registros en la tabla pivote order_coffee
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

  // Método para eliminar registros en la tabla pivote order_coffee
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

  // Método para eliminar una orden por su ID
  public static async deleteOrder(order_id: number): Promise<boolean> {
    const query = 'DELETE FROM orders WHERE order_id = ?';
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

  // Método para actualizar una orden por su ID
  public static async updateOrder(orderId: number, order: Order): Promise<void> {
    const query = 'UPDATE orders SET date_orders = ?, client_id = ? WHERE order_id = ?';
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
