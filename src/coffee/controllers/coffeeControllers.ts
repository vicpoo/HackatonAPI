import { Request, Response } from 'express';
import { coffeeService } from '../services/coffeeService';


export const getCoffee = async (_req: Request, res: Response) => {
  try {
    const coffee = await coffeeService.getAllCoffee();
    if(coffee){
      res.status(201).json(coffee);
    }else{
      res.status(404).json({ message: 'Sin registros' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getCoffeeById = async (req: Request, res: Response) => {
  try {
    const coffee = await coffeeService.getCoffeeById(parseInt(req.params.clients_id, 10));
    if(coffee){
      res.status(201).json(coffee);
    }else{
      res.status(404).json({ message: 'No se encontró el cafe' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createCoffee = async (req: Request, res: Response) => {
  try {
    const newCoffee = await coffeeService.addCoffee(req.body);
    if(newCoffee){
      res.status(201).json(newCoffee);
    }else{
      res.status(404).json({ message: 'Algo salio mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCoffee = async (req: Request, res: Response) => {
  try {
    const updatedCoffee = await coffeeService.modifyCoffee(parseInt(req.params.coffee_id, 10), req.body);
    if(updatedCoffee){
      res.status(201).json(updatedCoffee);
    }else{
      res.status(404).json({ message: 'Algo salio mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteCoffee = async (req: Request, res: Response) => {
  try {
    const deleted = await coffeeService.deleteCoffee(parseInt(req.params.coffee_id, 10));
    if(deleted){
      res.status(201).json({ message: 'Se eliminó el cafe.' });
    }else{
      res.status(404).json({ message: 'Algo salio mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
