import { CoffeeRepository } from "../repositories/CoffeeRepository";
import { Coffee } from "../models/Coffee";
import { DateUtils } from "../../shared/utils/DateUtils";
import dotenv from 'dotenv';

dotenv.config();

export class CoffeeService {

    public static async getAllCoffee(): Promise<Coffee[]> {
        try {
            return await CoffeeRepository.findAll();
        } catch (error: any) {
            throw new Error(`Error al obtener el café: ${error.message}`);
        }
    }

    public static async getCoffeeById(coffeeId: number): Promise<Coffee | null> {
        try {
            return await CoffeeRepository.findById(coffeeId);
        } catch (error: any) {
            throw new Error(`Error al encontrar el café: ${error.message}`);
        }
    }

    public static async getCoffeeByName(name: string): Promise<Coffee | null> {
        try {
            return await CoffeeRepository.findByName(name);
        } catch (error: any) {
            throw new Error(`Error al encontrar el café: ${error.message}`);
        }
    }

    public static async addCoffee(coffee: Coffee) {
        try {
            coffee.created_at = DateUtils.formatDate(new Date());
            coffee.updated_at = DateUtils.formatDate(new Date());
            return await CoffeeRepository.createCoffee(coffee);
        } catch (error: any) {
            throw new Error(`Error al crear el café: ${error.message}`);
        }
    }

    public static async modifyCoffee(coffeeId: number, coffeeData: Coffee) {
        try {
            const coffeeFound = await CoffeeRepository.findById(coffeeId);

            if (coffeeFound) {
                // Actualizar solo los campos definidos en coffeeData
                Object.assign(coffeeFound, coffeeData);

                coffeeFound.updated_at = DateUtils.formatDate(new Date());

                return await CoffeeRepository.updateCoffee(coffeeId, coffeeFound);
            } else {
                return null;
            }
        } catch (error: any) {
            throw new Error(`Error al modificar el café: ${error.message}`);
        }
    }

    public static async deleteCoffee(coffeeId: number): Promise<boolean> {
        try {
            return await CoffeeRepository.deleteCoffee(coffeeId);
        } catch (error: any) {
            throw new Error(`Error al eliminar el café: ${error.message}`);
        }
    }

    public static async incrementCoffeeStock(coffeeId: number, incrementQuantity: number): Promise<boolean> {
        try {
            // Obtener el café por su ID
            const coffee = await CoffeeRepository.findById(coffeeId);

            if (coffee) {
                // Incrementar el stock
                coffee.inventory_quantity += incrementQuantity;
                coffee.updated_at = DateUtils.formatDate(new Date());

                // Actualizar en la base de datos
                const success = await CoffeeRepository.updateCoffee(coffeeId, coffee);

                return success; // Devolver el resultado de la actualización
            } else {
                throw new Error(`No se encontró el café con ID ${coffeeId}`);
            }
        } catch (error: any) {
            throw new Error(`Error al incrementar el stock del café: ${error.message}`);
        }
    }
}
