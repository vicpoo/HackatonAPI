import { Request, Response } from 'express';
import { orderCoffeeService } from '../services/order_coffeeService';


export const getOrderCoffee = async (_req: Request, res: Response) => {
  try {
    const orderCoffee = await orderCoffeeService.getAllOrderCoffee();
    if(orderCoffee){
      res.status(201).json(orderCoffee);
    }else{
      res.status(404).json({ message: 'Sin registros' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getOrderCoffeeById = async (req: Request, res: Response) => {
  try {
    const orderCoffee = await orderCoffeeService.getOrderCoffeeById(parseInt(req.params.order_coffee_id, 10));
    if(orderCoffee){
      res.status(201).json(orderCoffee);
    }else{
      res.status(404).json({ message: 'No se encontró el rol' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createOrderCoffee = async (req: Request, res: Response) => {
  try {
    const newOrderCoffee = await orderCoffeeService.addOrderCoffee(req.body);
    if(newOrderCoffee){
      res.status(201).json(newOrderCoffee);
    }else{
      res.status(404).json({ message: 'Algo salio mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateOrderCoffee = async (req: Request, res: Response) => {
  try {
    const updatedOrderCoffee = await orderCoffeeService.modifyOrderCoffee(parseInt(req.params.order_coffee_id, 10), req.body);
    if(updatedOrderCoffee){
      res.status(201).json(updatedOrderCoffee);
    }else{
      res.status(404).json({ message: 'Algo salio mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteOrderCoffee = async (req: Request, res: Response) => {
  try {
    const deleted = await orderCoffeeService.deleteOrderCoffee(parseInt(req.params.order_coffee_id, 10));
    if(deleted){
      res.status(201).json({ message: 'Se eliminó el rol.' });
    }else{
      res.status(404).json({ message: 'Algo salio mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
