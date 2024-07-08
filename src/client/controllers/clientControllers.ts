import { Request, Response } from 'express';
import { clientService } from '../services/clientService';


export const getClient = async (_req: Request, res: Response) => {
  try {
    const client = await clientService.getAllClient();
    if(client){
      res.status(201).json(client);
    }else{
      res.status(404).json({ message: 'Sin registros' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getClientById = async (req: Request, res: Response) => {
  try {
    const client = await clientService.getClientById(parseInt(req.params.client_id, 10));
    if(client){
      res.status(201).json(client);
    }else{
      res.status(404).json({ message: 'No se encontró el cliente' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createClient = async (req: Request, res: Response) => {
  try {
    const newClient = await clientService.addClient(req.body);
    if(newClient){
      res.status(201).json(newClient);
    }else{
      res.status(404).json({ message: 'Algo salio mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateClient = async (req: Request, res: Response) => {
  try {
    const updatedClient = await clientService.modifyClient(parseInt(req.params.client_id, 10), req.body);
    if(updatedClient){
      res.status(201).json(updatedClient);
    }else{
      res.status(404).json({ message: 'Algo salio mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteClient = async (req: Request, res: Response) => {
  try {
    const deleted = await clientService.deleteClient(parseInt(req.params.client_id, 10));
    if(deleted){
      res.status(201).json({ message: 'Se eliminó el cliente.' });
    }else{
      res.status(404).json({ message: 'Algo salio mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
