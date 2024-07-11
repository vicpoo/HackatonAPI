import { Router } from 'express';
import { getOrderCoffeeById, getOrderCoffee, createOrderCoffee, updateOrderCoffee, deleteOrderCoffee } from '../controllers/order_coffeeControllers';

const orderCoffeeRoutes: Router = Router();

orderCoffeeRoutes.get('/', getOrderCoffee);
orderCoffeeRoutes.get('/:order_coffee_id', getOrderCoffeeById);
orderCoffeeRoutes.post('/', createOrderCoffee);
orderCoffeeRoutes.put('/:order_coffee_id', updateOrderCoffee);
orderCoffeeRoutes.delete('/:order_coffee_id', deleteOrderCoffee);

export default orderCoffeeRoutes;