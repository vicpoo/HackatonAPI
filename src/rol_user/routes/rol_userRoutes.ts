import { Router } from 'express';
import { getRol, getRolById, createRol, updateRol, deleteRol } from '../controllers/rol_userControllers';

const rolRoutes: Router = Router();

rolRoutes.get('/', getRol);
rolRoutes.get('/:rol_id', getRolById);
rolRoutes.post('/', createRol);
rolRoutes.put('/:rol_id', updateRol);
rolRoutes.delete('/:rol_id', deleteRol);

export default rolRoutes;