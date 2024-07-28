import { OrderRepository } from "../repositories/OrderRepository";
import { Order } from "../models/Order";
import { CoffeeService } from "../../coffee/services/coffeeService";

export class orderService {

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

    public static async addOrder(order: Order): Promise<Order> {
        try {
            const newOrder = await OrderRepository.createOrder(order);
            return newOrder;
        } catch (error: any) {
            throw new Error(`Error al crear la orden: ${error.message}`);
        }
    }

    public static async addOrderWithCoffees(order: Order, coffees: { coffee_id: number, quantity: number }[]): Promise<Order> {
        try {
            const newOrder = await OrderRepository.createOrder(order);
            for (const coffee of coffees) {
                await OrderRepository.addCoffeeToOrder(newOrder.order_id, coffee.coffee_id, coffee.quantity);
                await CoffeeService.incrementCoffeeStock(coffee.coffee_id, -coffee.quantity);
            }
            return newOrder;
        } catch (error: any) {
            throw new Error(`Error al crear la orden: ${error.message}`);
        }
    }

    public static async modifyOrder(orderId: number, order: Order, coffees: { coffee_id: number, quantity: number }[]): Promise<Order> {
        try {
            await OrderRepository.updateOrder(orderId, order);
            await OrderRepository.deleteCoffeesFromOrder(orderId);
            for (const coffee of coffees) {
                await OrderRepository.addCoffeeToOrder(orderId, coffee.coffee_id, coffee.quantity);
                await CoffeeService.incrementCoffeeStock(coffee.coffee_id, -coffee.quantity);
            }
            return order;
        } catch (error: any) {
            throw new Error(`Error al actualizar la orden: ${error.message}`);
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
