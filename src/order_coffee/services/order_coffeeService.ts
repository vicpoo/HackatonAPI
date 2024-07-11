import { Order_coffeeRepository } from "../repositories/order_coffeeRepository";
import { Order_coffee } from "../models/order_coffee";
import { DateUtils } from "../../shared/utils/DateUtils";
import dotenv from 'dotenv';

dotenv.config();

export class orderCoffeeService {

    public static async getAllOrderCoffee(): Promise<Order_coffee[]> {
        try{
            return await Order_coffeeRepository.findAll();
        }catch (error: any){
            throw new Error(`Error al obtener todos los datos de la tabla OrderCoffee: ${error.message}`);
        }
    }

    public static async getOrderCoffeeById(orderCoffeeId: number): Promise<Order_coffee | null> {
        try{
            return await Order_coffeeRepository.findById(orderCoffeeId);
        }catch (error: any){
            throw new Error(`Error al encontrar el id del orderCoffee: ${error.message}`);
        }
    }


    public static async addOrderCoffee(orderCoffee: Order_coffee) {
        try {
            orderCoffee.created_at = DateUtils.formatDate(new Date());
            orderCoffee.updated_at = DateUtils.formatDate(new Date());
            return await Order_coffeeRepository.createOrderCoffee(orderCoffee);
        } catch (error: any) {
            throw new Error(`Error al agregar el dato : ${error.message}`);
        }
    }

    public static async modifyOrderCoffee(orderCoffeeId: number, orderCoffeeData: Order_coffee){
        try{
            const orderCoffeeFinded =  await Order_coffeeRepository.findById(orderCoffeeId);

            if(orderCoffeeFinded){
                if(orderCoffeeData.coffee_id_fk){
                    orderCoffeeFinded.coffee_id_fk = orderCoffeeData.coffee_id_fk;
                }
                if(orderCoffeeData.order_id_fk){
                    orderCoffeeFinded.order_id_fk = orderCoffeeData.order_id_fk;
                }
                if(orderCoffeeData.quantify){
                    orderCoffeeFinded.quantify = orderCoffeeData.quantify;
                }
                if(orderCoffeeData.deleted){
                    orderCoffeeFinded.deleted = orderCoffeeData.deleted;
                }
            }else{
                return null;
            }
            orderCoffeeFinded.updated_by = orderCoffeeData.updated_by
            orderCoffeeFinded.updated_at = DateUtils.formatDate(new Date());
            return await Order_coffeeRepository.updateOrderCoffee(orderCoffeeId, orderCoffeeFinded);
        }catch (error: any){
            throw new Error(`Error al modificar el dato: ${error.message}`);
        }
    }

    public static async deleteOrderCoffee(orderCoffeeId: number): Promise<boolean> {
        try{
            return await Order_coffeeRepository.deleteOrderCoffee(orderCoffeeId);
        }catch (error: any){
            throw new Error(`Error al eliminar el dato: ${error.message}`);
        }
    }

}