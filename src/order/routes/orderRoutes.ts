import { Router } from 'express';
import { getOrder, getOrderById, createOrder, updateOrder, deleteOrder, createOrderWithCoffees } from '../controllers/orderControllers';

const orderRoutes: Router = Router();

orderRoutes.get('/', getOrder);
orderRoutes.get('/:order_id', getOrderById);
orderRoutes.post('/', createOrder);
orderRoutes.post('/with-coffees', createOrderWithCoffees);
orderRoutes.put('/:order_id', updateOrder);
orderRoutes.delete('/:order_id', deleteOrder);

export default orderRoutes;
