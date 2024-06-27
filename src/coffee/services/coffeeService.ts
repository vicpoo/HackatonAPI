import { CoffeeRepository } from "../repositories/CoffeeRepository";
import { Coffee } from "../models/Coffee";
import { DateUtils } from "../../shared/utils/DateUtils";
import dotenv from 'dotenv';

dotenv.config();


export class coffeeService {

    public static async getAllCoffee(): Promise<Coffee[]> {
        try{
            return await CoffeeRepository.findAll();
        }catch (error: any){
            throw new Error(`Error al obtener el cafe: ${error.message}`);
        }
    }

    public static async getCoffeeById(coffeeId: number): Promise<Coffee | null> {
        try{
            return await CoffeeRepository.findById(coffeeId);
        }catch (error: any){
            throw new Error(`Error al encontrar el cafe: ${error.message}`);
        }
    }

    public static async getCoffeeByName(Name: string): Promise<Coffee | null> {
        try{
            return await CoffeeRepository.findByName(Name);
        }catch (error: any){
            throw new Error(`Error al encontrar al cafe: ${error.message}`);
        }
    }

    public static async addCoffee(coffee: Coffee) {
        try {
            coffee.created_at = DateUtils.formatDate(new Date());
            coffee.updated_at = DateUtils.formatDate(new Date());
            return await CoffeeRepository.createCoffee(coffee);
        } catch (error: any) {
            throw new Error(`Error al crear el cafe: ${error.message}`);
        }
    }

    public static async modifyCoffee(coffeeId: number, coffeeData: Coffee){
        try{
            const coffeeFinded =  await CoffeeRepository.findById(coffeeId);

            if(coffeeFinded){
                if(coffeeData.name){
                    coffeeFinded.name = coffeeData.name;
                }
                if(coffeeData.origin){
                    coffeeFinded.origin = coffeeData.origin;
                }
                if(coffeeData.height){
                    coffeeFinded.height = coffeeData.height;
                }
                if(coffeeData.qualification){
                    coffeeFinded.qualification = coffeeData.qualification;
                }
                if(coffeeData.price){
                    coffeeFinded.price = coffeeData.price;
                }
                if(coffeeData.inventory_quantity){
                    coffeeFinded.inventory_quantity = coffeeData.inventory_quantity;
                }
                if(coffeeData.deleted){
                    coffeeFinded.deleted = coffeeData.deleted;
                }
            }else{
                return null;
            }
            coffeeFinded.updated_by = coffeeData.updated_by
            coffeeFinded.updated_at = DateUtils.formatDate(new Date());
            return await CoffeeRepository.updateCoffee(coffeeId, coffeeFinded);
        }catch (error: any){
            throw new Error(`Error al modificar el cafe: ${error.message}`);
        }
    }

    public static async deleteCoffee(coffee_Id: number): Promise<boolean> {
        try{
            return await CoffeeRepository.deleteCoffee(coffee_Id);
        }catch (error: any){
            throw new Error(`Error al eliminar el cafe: ${error.message}`);
        }
    }

}