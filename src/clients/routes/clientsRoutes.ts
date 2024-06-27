import { Router } from 'express';
import { getClients, getClientsById, createClients, updateClients, deleteClients,} from '../controllers/clientsControllers';
import { authMiddleware } from '../../shared/middlewares/auth';

const clientsRoutes: Router = Router();

clientsRoutes.get('/', getClients);
clientsRoutes.get('/:clients_id', authMiddleware,getClientsById);
clientsRoutes.post('/', createClients);
clientsRoutes.put('/:clients_id', updateClients);
clientsRoutes.delete('/:clients_id', deleteClients);

export default clientsRoutes;