import { Request, Response } from 'express';
import { orderService } from '../services/orderService';


export const getOrder = async (_req: Request, res: Response) => {
  try {
    const order = await orderService.getAllOrder();
    if(order){
      res.status(201).json(order);
    }else{
      res.status(404).json({ message: 'Sin registros' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const order = await orderService.getOrderById(parseInt(req.params.order_id, 10));
    if(order){
      res.status(201).json(order);
    }else{
      res.status(404).json({ message: 'No se encontró la orden' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createOrder = async (req: Request, res: Response) => {
  try {
    const newOrder = await orderService.addOrder(req.body);
    if(newOrder){
      res.status(201).json(newOrder);
    }else{
      res.status(404).json({ message: 'Algo salio mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateOrder = async (req: Request, res: Response) => {
  try {
    const updatedOrder = await orderService.modifyOrder(parseInt(req.params.order_id, 10), req.body);
    if(updatedOrder){
      res.status(201).json(updatedOrder);
    }else{
      res.status(404).json({ message: 'Algo salio mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const deleted = await orderService.deleteOrder(parseInt(req.params.order_id, 10));
    if(deleted){
      res.status(201).json({ message: 'Se eliminó la orden.' });
    }else{
      res.status(404).json({ message: 'Algo salio mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
