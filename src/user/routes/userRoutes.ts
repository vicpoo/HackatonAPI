import { Router } from 'express';
import { getUser, getUserById, createUser, updateUser, deleteUser, loginUser } from '../controllers/userController';
import { authMiddleware } from '../../shared/middlewares/auth';

const userRoutes: Router = Router();

userRoutes.post('/login', loginUser);

userRoutes.get('/', getUser);
userRoutes.get('/:user_id', authMiddleware,getUserById);
userRoutes.post('/', authMiddleware,createUser);
userRoutes.put('/:user_id', authMiddleware, updateUser);
userRoutes.delete('/:user_id' , authMiddleware, deleteUser);

export default userRoutes;