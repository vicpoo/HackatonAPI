import { Request, Response } from 'express';
import { orderService } from '../services/orderService';

// Controlador para obtener todas las órdenes
export const getOrder = async (_req: Request, res: Response) => {
  try {
    const order = await orderService.getAllOrders();
    if (order) {
      res.status(201).json(order);
    } else {
      res.status(404).json({ message: 'Sin registros' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Controlador para obtener una orden por su ID
export const getOrderById = async (req: Request, res: Response) => {
  try {
    const order = await orderService.getOrderById(parseInt(req.params.order_id, 10));
    if (order) {
      res.status(201).json(order);
    } else {
      res.status(404).json({ message: 'No se encontró la orden' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Controlador para crear una nueva orden
export const createOrder = async (req: Request, res: Response) => {
  try {
    const newOrder = await orderService.addOrder(req.body);
    if (newOrder) {
      res.status(201).json(newOrder);
    } else {
      res.status(404).json({ message: 'Algo salió mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Controlador para crear una nueva orden con cafés asociados
export const createOrderWithCoffees = async (req: Request, res: Response) => {
  try {
    const { order, coffees } = req.body; // Se espera que el cuerpo de la solicitud tenga una orden y una lista de cafés
    const newOrder = await orderService.addOrderWithCoffees(order, coffees);
    if (newOrder) {
      res.status(201).json(newOrder);
    } else {
      res.status(400).json({ message: 'Algo salió mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Controlador para actualizar una orden existente
export const updateOrder = async (req: Request, res: Response) => {
  try {
    const { order, coffees } = req.body;
    const updatedOrder = await orderService.modifyOrder(parseInt(req.params.order_id, 10), order, coffees);
    if (updatedOrder) {
      res.status(201).json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Algo salió mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Controlador para eliminar una orden por su ID
export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const deleted = await orderService.deleteOrder(parseInt(req.params.order_id, 10));
    if (deleted) {
      res.status(201).json({ message: 'Se eliminó la orden.' });
    } else {
      res.status(404).json({ message: 'Algo salió mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
