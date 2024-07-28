import { OrderRepository } from "../repositories/OrderRepository";
import { CoffeeRepository } from "../../coffee/repositories/CoffeeRepository"; // Corrige el import aquí
import { Order } from "../models/Order";
import { DateUtils } from "../../shared/utils/DateUtils";
import { OrderCoffee } from "../models/OrderCoffee";
import dotenv from 'dotenv';

dotenv.config();

export class OrderService {
    public static async addOrder(order: Order, orderCoffees: OrderCoffee[]): Promise<Order> {
        try {
            order.created_at = DateUtils.formatDate(new Date());
            order.updated_at = DateUtils.formatDate(new Date());
            const newOrder = await OrderRepository.createOrder(order);

            for (const orderCoffee of orderCoffees) {
                await OrderRepository.addOrderCoffee(newOrder.order_id, orderCoffee);
                // Actualiza el stock del café
                await CoffeeRepository.updateStock(orderCoffee.coffee_id_fk, -orderCoffee.quantify);
            }

            return newOrder;
        } catch (error: any) {
            throw new Error(`Error al crear la orden: ${error.message}`);
        }
    }

    public static async getAllOrders(): Promise<Order[]> {
        try {
            return await OrderRepository.findAll();
        } catch (error: any) {
            throw new Error(`Error al obtener las órdenes: ${error.message}`);
        }
    }

    public static async getOrderById(orderId: number): Promise<Order | null> {
        try {
            return await OrderRepository.findById(orderId);
        } catch (error: any) {
            throw new Error(`Error al encontrar la orden: ${error.message}`);
        }
    }

    public static async getOrderByDate(date_orders: string): Promise<Order | null> {
        try {
            return await OrderRepository.findByDate(date_orders);
        } catch (error: any) {
            throw new Error(`Error al encontrar la orden: ${error.message}`);
        }
    }

    public static async modifyOrder(orderId: number, orderData: Order): Promise<Order | null> {
        try {
            const orderFound = await OrderRepository.findById(orderId);

            if (orderFound) {
                if (orderData.date_orders) {
                    orderFound.date_orders = orderData.date_orders;
                }
                if (orderData.client_id_fk) {
                    orderFound.client_id_fk = orderData.client_id_fk;
                }
                if (orderData.deleted) {
                    orderFound.deleted = orderData.deleted;
                }
                orderFound.updated_by = orderData.updated_by;
                orderFound.updated_at = DateUtils.formatDate(new Date());
                return await OrderRepository.updateOrder(orderId, orderFound);
            } else {
                return null;
            }
        } catch (error: any) {
            throw new Error(`Error al modificar la orden: ${error.message}`);
        }
    }

    public static async deleteOrder(orderId: number): Promise<boolean> {
        try {
            return await OrderRepository.deleteOrder(orderId);
        } catch (error: any) {
            throw new Error(`Error al eliminar la orden: ${error.message}`);
        }
    }
}
