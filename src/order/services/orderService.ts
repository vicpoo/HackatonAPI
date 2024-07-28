import { OrderRepository } from "../repositories/OrderRepository";
import { Order } from "../models/Order";
import { CoffeeService } from "../../coffee/services/coffeeService"; // Importar CoffeeService para actualizar stock

export class orderService {

    // Método para obtener todas las órdenes
    public static async getAllOrders(): Promise<Order[]> {
        try {
            return await OrderRepository.findAll();
        } catch (error: any) {
            throw new Error(`Error al obtener las órdenes: ${error.message}`);
        }
    }

    // Método para obtener una orden por su ID
    public static async getOrderById(orderId: number): Promise<Order | null> {
        try {
            return await OrderRepository.findById(orderId);
        } catch (error: any) {
            throw new Error(`Error al encontrar la orden: ${error.message}`);
        }
    }

    // Método para agregar una nueva orden y actualizar el stock del café
    public static async addOrder(order: Order): Promise<Order> {
        try {
            const newOrder = await OrderRepository.createOrder(order);
            return newOrder;
        } catch (error: any) {
            throw new Error(`Error al crear la orden: ${error.message}`);
        }
    }

    // Método para agregar una nueva orden con cafés y actualizar el stock del café
    public static async addOrderWithCoffees(order: Order, coffees: { coffee_id: number, quantity: number }[]): Promise<Order> {
        try {
            const newOrder = await OrderRepository.createOrder(order);

            // Insertar registros en la tabla pivote order_coffee y actualizar el stock de los cafés
            for (const coffee of coffees) {
                await OrderRepository.addCoffeeToOrder(newOrder.order_id, coffee.coffee_id, coffee.quantity);
                await CoffeeService.incrementCoffeeStock(coffee.coffee_id, -coffee.quantity);
            }

            return newOrder;
        } catch (error: any) {
            throw new Error(`Error al crear la orden: ${error.message}`);
        }
    }

    // Método para actualizar una orden existente y su stock asociado
    public static async modifyOrder(orderId: number, order: Order, coffees: { coffee_id: number, quantity: number }[]): Promise<Order> {
        try {
            await OrderRepository.updateOrder(orderId, order);

            // Actualizar registros en la tabla pivote order_coffee y ajustar el stock de los cafés
            await OrderRepository.deleteCoffeesFromOrder(orderId); // Eliminar registros anteriores
            for (const coffee of coffees) {
                await OrderRepository.addCoffeeToOrder(orderId, coffee.coffee_id, coffee.quantity);
                await CoffeeService.incrementCoffeeStock(coffee.coffee_id, -coffee.quantity);
            }

            return order;
        } catch (error: any) {
            throw new Error(`Error al actualizar la orden: ${error.message}`);
        }
    }

    // Método para eliminar una orden por su ID
    public static async deleteOrder(orderId: number): Promise<boolean> {
        try {
            return await OrderRepository.deleteOrder(orderId);
        } catch (error: any) {
            throw new Error(`Error al eliminar la orden: ${error.message}`);
        }
    }
}
