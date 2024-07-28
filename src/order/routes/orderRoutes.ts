import { Router } from 'express';
import { getOrder, getOrderById, createOrder, updateOrder, deleteOrder, createOrderWithCoffees } from '../controllers/orderControllers';
import { authMiddleware } from '../../shared/middlewares/auth';

const orderRoutes: Router = Router();

// Definición de las rutas y asignación de controladores
orderRoutes.get('/', getOrder); // Obtener todas las órdenes
orderRoutes.get('/:order_id', authMiddleware, getOrderById); // Obtener una orden por ID
orderRoutes.post('/', createOrder); // Crear una nueva orden
orderRoutes.post('/with-coffees', createOrderWithCoffees); // Crear una nueva orden con cafés asociados
orderRoutes.put('/:order_id', updateOrder); // Actualizar una orden existente
orderRoutes.delete('/:order_id', deleteOrder); // Eliminar una orden por ID

export default orderRoutes;
