import { Request, Response } from 'express';
import { CoffeeService } from '../services/coffeeService';

export const getCoffee = async (_req: Request, res: Response) => {
  try {
    const coffee = await CoffeeService.getAllCoffee();
    if (coffee) {
      res.status(200).json(coffee);
    } else {
      res.status(404).json({ message: 'Sin registros' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getCoffeeById = async (req: Request, res: Response) => {
  try {
    const coffee = await CoffeeService.getCoffeeById(parseInt(req.params.coffee_id, 10));
    if (coffee) {
      res.status(200).json(coffee);
    } else {
      res.status(404).json({ message: 'No se encontró el café' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createCoffee = async (req: Request, res: Response) => {
  try {
    const newCoffee = await CoffeeService.addCoffee(req.body);
    if (newCoffee) {
      res.status(201).json(newCoffee);
    } else {
      res.status(400).json({ message: 'Algo salió mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCoffee = async (req: Request, res: Response) => {
  try {
    const updatedCoffee = await CoffeeService.modifyCoffee(parseInt(req.params.coffee_id, 10), req.body);
    if (updatedCoffee) {
      res.status(200).json({ message: 'Se Actualizo el cafe.' });
    } else {
      res.status(404).json({ message: 'No se encontró el café' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteCoffee = async (req: Request, res: Response) => {
  try {
    const deleted = await CoffeeService.deleteCoffee(parseInt(req.params.coffee_id, 10));
    if (deleted) {
      res.status(200).json({ message: 'Se eliminó el café.' });
    } else {
      res.status(404).json({ message: 'No se encontró el café' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCoffeeStock = async (req: Request, res: Response) => {
  try {
    const coffeeId = parseInt(req.params.coffee_id, 10);
    const { increment_quantity } = req.body; // El campo puede llamarse como desees, aquí se usa 'increment_quantity'

    if (!increment_quantity || typeof increment_quantity !== 'number') {
      return res.status(400).json({ message: 'Debes proporcionar una cantidad válida para incrementar el stock.' });
    }

    const success = await CoffeeService.incrementCoffeeStock(coffeeId, increment_quantity);

    if (success) {
      res.status(200).json({ message: `Stock del café actualizado aumentando ${increment_quantity}` });
    } else {
      res.status(404).json({ message: 'No se encontró el café' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
