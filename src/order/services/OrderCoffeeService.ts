import { OrderCoffeeRepository } from '../repositories/OrderCoffeeRepository';
import { OrderCoffee } from '../models/OrderCoffee';
import { DateUtils } from '../../shared/utils/DateUtils';

export class OrderCoffeeService {
  public static async getAllOrderCoffees(): Promise<OrderCoffee[]> {
    try {
      return await OrderCoffeeRepository.findAll();
    } catch (error: any) {
      throw new Error(`Error al obtener los pedidos de café: ${error.message}`);
    }
  }

  public static async getOrderCoffeeById(orderCoffeeId: number): Promise<OrderCoffee | null> {
    try {
      return await OrderCoffeeRepository.findById(orderCoffeeId);
    } catch (error: any) {
      throw new Error(`Error al encontrar el pedido de café: ${error.message}`);
    }
  }

  public static async addOrderCoffee(orderCoffee: OrderCoffee) {
    try {
      orderCoffee.created_at = DateUtils.formatDate(new Date());
      orderCoffee.updated_at = DateUtils.formatDate(new Date());
      return await OrderCoffeeRepository.createOrderCoffee(orderCoffee);
    } catch (error: any) {
      throw new Error(`Error al crear el pedido de café: ${error.message}`);
    }
  }

  public static async modifyOrderCoffee(orderCoffeeId: number, orderCoffeeData: OrderCoffee): Promise<OrderCoffee | null> {
    try {
      const orderCoffeeFound = await OrderCoffeeRepository.findById(orderCoffeeId);

      if (orderCoffeeFound) {
        if (orderCoffeeData.order_id) {
          orderCoffeeFound.order_id = orderCoffeeData.order_id;
        }
        if (orderCoffeeData.coffee_id) {
          orderCoffeeFound.coffee_id = orderCoffeeData.coffee_id;
        }
        if (orderCoffeeData.quantity) {
          orderCoffeeFound.quantity = orderCoffeeData.quantity;
        }
        if (orderCoffeeData.price) {
          orderCoffeeFound.price = orderCoffeeData.price;
        }
        if (orderCoffeeData.deleted) {
          orderCoffeeFound.deleted = orderCoffeeData.deleted;
        }
      } else {
        return null;
      }
      orderCoffeeFound.updated_by = orderCoffeeData.updated_by;
      orderCoffeeFound.updated_at = DateUtils.formatDate(new Date());
      return await OrderCoffeeRepository.updateOrderCoffee(orderCoffeeId, orderCoffeeFound);
    } catch (error: any) {
      throw new Error(`Error al modificar el pedido de café: ${error.message}`);
    }
  }

  public static async deleteOrderCoffee(orderCoffeeId: number): Promise<boolean> {
    try {
      return await OrderCoffeeRepository.deleteOrderCoffee(orderCoffeeId);
    } catch (error: any) {
      throw new Error(`Error al eliminar el pedido de café: ${error.message}`);
    }
  }
}
