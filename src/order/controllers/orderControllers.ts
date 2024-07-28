import { Request, Response } from 'express';
import { OrderService } from '../services/orderService';
import { Order } from '../models/Order';
import { OrderCoffee } from '../models/OrderCoffee';

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { order, orderCoffees }: { order: Order; orderCoffees: OrderCoffee[] } = req.body;
    
    if (!order || !orderCoffees) {
      return res.status(400).json({ message: 'Faltan datos para crear la orden' });
    }
    
    const newOrder = await OrderService.addOrder(order, orderCoffees);
    
    if (newOrder) {
      res.status(201).json(newOrder);
    } else {
      res.status(404).json({ message: 'Algo salió mal' });
    }
  } catch (error: any) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getOrder = async (_req: Request, res: Response) => {
  try {
    const orders = await OrderService.getAllOrders();
    
    if (orders.length > 0) {
      res.status(200).json(orders);
    } else {
      res.status(404).json({ message: 'Sin registros' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const order = await OrderService.getOrderById(parseInt(req.params.order_id, 10));
    
    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).json({ message: 'No se encontró la orden' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateOrder = async (req: Request, res: Response) => {
  try {
    const updatedOrder = await OrderService.modifyOrder(parseInt(req.params.order_id, 10), req.body);
    
    if (updatedOrder) {
      res.status(200).json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Algo salió mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const deleted = await OrderService.deleteOrder(parseInt(req.params.order_id, 10));
    
    if (deleted) {
      res.status(200).json({ message: 'Se eliminó la orden.' });
    } else {
      res.status(404).json({ message: 'Algo salió mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
