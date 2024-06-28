import { Router } from 'express';
import { getClient, getClientById, createClient, updateClient, deleteClient,} from '../controllers/clientControllers';

const clientRoutes: Router = Router();

clientRoutes.get('/', getClient);
clientRoutes.get('/:client_id', getClientById);
clientRoutes.post('/', createClient);
clientRoutes.put('/:client_id', updateClient);
clientRoutes.delete('/:client_id', deleteClient);

export default clientRoutes;