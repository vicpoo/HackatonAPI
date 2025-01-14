import { Request, Response } from 'express';
import { OrderCoffeeService } from '../services/OrderCoffeeService';

export const getOrderCoffee = async (_req: Request, res: Response) => {
  try {
    const orderCoffee = await OrderCoffeeService.getAllOrderCoffee();
    if (orderCoffee) {
      res.status(200).json(orderCoffee);
    } else {
      res.status(404).json({ message: 'Sin registros' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getOrderCoffeeById = async (req: Request, res: Response) => {
  try {
    const orderCoffee = await OrderCoffeeService.getOrderCoffeeById(parseInt(req.params.order_coffee_id, 10));
    if (orderCoffee) {
      res.status(200).json(orderCoffee);
    } else {
      res.status(404).json({ message: 'No se encontró el registro' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createOrderCoffee = async (req: Request, res: Response) => {
  try {
    const newOrderCoffee = await OrderCoffeeService.addOrderCoffee(req.body);
    if (newOrderCoffee) {
      res.status(201).json(newOrderCoffee);
    } else {
      res.status(400).json({ message: 'Algo salió mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateOrderCoffee = async (req: Request, res: Response) => {
  try {
    const updated = await OrderCoffeeService.updateOrderCoffee(parseInt(req.params.order_coffee_id, 10), req.body);
    if (updated) {
      res.status(200).json({ message: 'Registro actualizado correctamente.' });
    } else {
      res.status(404).json({ message: 'No se encontró el registro' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteOrderCoffee = async (req: Request, res: Response) => {
  try {
    const deleted = await OrderCoffeeService.deleteOrderCoffee(parseInt(req.params.order_coffee_id, 10));
    if (deleted) {
      res.status(200).json({ message: 'Registro eliminado correctamente.' });
    } else {
      res.status(404).json({ message: 'No se encontró el registro' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
