import { Router } from 'express';
import { getOrderCoffees, getOrderCoffeeById, createOrderCoffee, updateOrderCoffee, deleteOrderCoffee } from '../controllers/OrderCoffeeControllers';

const router = Router();

router.get('/order_coffee', getOrderCoffees);
router.get('/order_coffee/:order_coffee_id', getOrderCoffeeById);
router.post('/order_coffee', createOrderCoffee);
router.put('/order_coffee/:order_coffee_id', updateOrderCoffee);
router.delete('/order_coffee/:order_coffee_id', deleteOrderCoffee);

export default router;
