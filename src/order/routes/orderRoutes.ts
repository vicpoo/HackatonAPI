import { Router } from 'express';
import { getOrder, getOrderById, createOrder, updateOrder, deleteOrder } from '../controllers/orderControllers';
import { authMiddleware } from '../../shared/middlewares/auth';

const orderRoutes: Router = Router();

orderRoutes.get('/', getOrder);
orderRoutes.get('/:order_id', authMiddleware,getOrderById);
orderRoutes.post('/', createOrder);
orderRoutes.put('/:order_id', updateOrder);
orderRoutes.delete('/:order_id', deleteOrder);

export default orderRoutes;