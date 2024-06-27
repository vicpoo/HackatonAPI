import { Request, Response } from 'express';
import { clientsService } from '../services/clientsService';


export const getClients = async (_req: Request, res: Response) => {
  try {
    const clients = await clientsService.getAllClients();
    if(clients){
      res.status(201).json(clients);
    }else{
      res.status(404).json({ message: 'Sin registros' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getClientsById = async (req: Request, res: Response) => {
  try {
    const clients = await clientsService.getClientsById(parseInt(req.params.clients_id, 10));
    if(clients){
      res.status(201).json(clients);
    }else{
      res.status(404).json({ message: 'No se encontró el usuario' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createClients = async (req: Request, res: Response) => {
  try {
    const newClients = await clientsService.addClients(req.body);
    if(newClients){
      res.status(201).json(newClients);
    }else{
      res.status(404).json({ message: 'Algo salio mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateClients = async (req: Request, res: Response) => {
  try {
    const updatedClients = await clientsService.modifyClients(parseInt(req.params.clients_id, 10), req.body);
    if(updatedClients){
      res.status(201).json(updatedClients);
    }else{
      res.status(404).json({ message: 'Algo salio mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteClients = async (req: Request, res: Response) => {
  try {
    const deleted = await clientsService.deleteClients(parseInt(req.params.clients_id, 10));
    if(deleted){
      res.status(201).json({ message: 'Se eliminó el empleado.' });
    }else{
      res.status(404).json({ message: 'Algo salio mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
