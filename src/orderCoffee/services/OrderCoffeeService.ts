import { OrderCoffeeRepository } from '../repositories/OrderCoffeeRepository';
import { OrderCoffee } from '../models/OrderCoffee';

export class OrderCoffeeService {

  public static async getAllOrderCoffee(): Promise<OrderCoffee[]> {
    try {
      return await OrderCoffeeRepository.findAll();
    } catch (error: any) {
      throw new Error(`Error al obtener order_coffee: ${error.message}`);
    }
  }

  public static async getOrderCoffeeById(order_coffee_id: number): Promise<OrderCoffee | null> {
    try {
      return await OrderCoffeeRepository.findById(order_coffee_id);
    } catch (error: any) {
      throw new Error(`Error al encontrar order_coffee: ${error.message}`);
    }
  }

  public static async addOrderCoffee(orderCoffee: OrderCoffee): Promise<OrderCoffee> {
    try {
      return await OrderCoffeeRepository.createOrderCoffee(orderCoffee);
    } catch (error: any) {
      throw new Error(`Error al crear order_coffee: ${error.message}`);
    }
  }

  public static async updateOrderCoffee(order_coffee_id: number, orderCoffeeData: Partial<OrderCoffee>): Promise<boolean> {
    try {
      return await OrderCoffeeRepository.updateOrderCoffee(order_coffee_id, orderCoffeeData);
    } catch (error: any) {
      throw new Error(`Error al actualizar order_coffee: ${error.message}`);
    }
  }

  public static async deleteOrderCoffee(order_coffee_id: number): Promise<boolean> {
    try {
      return await OrderCoffeeRepository.deleteOrderCoffee(order_coffee_id);
    } catch (error: any) {
      throw new Error(`Error al eliminar order_coffee: ${error.message}`);
    }
  }
}
