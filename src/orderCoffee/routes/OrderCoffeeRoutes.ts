import { Router } from 'express';
import { getOrderCoffee, getOrderCoffeeById, createOrderCoffee, updateOrderCoffee, deleteOrderCoffee } from '../controllers/OrderCoffeeControllers';

const orderCoffeeRoutes: Router = Router();

orderCoffeeRoutes.get('/', getOrderCoffee);
orderCoffeeRoutes.get('/:order_coffee_id', getOrderCoffeeById);
orderCoffeeRoutes.post('/', createOrderCoffee);
orderCoffeeRoutes.put('/:order_coffee_id', updateOrderCoffee);
orderCoffeeRoutes.delete('/:order_coffee_id', deleteOrderCoffee);

export default orderCoffeeRoutes;
