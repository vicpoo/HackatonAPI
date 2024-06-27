import { Router } from 'express';
import { getCoffee, getCoffeeById, createCoffee, updateCoffee, deleteCoffee,} from '../controllers/coffeeControllers';
import { authMiddleware } from '../../shared/middlewares/auth';

const coffeeRoutes: Router = Router();

coffeeRoutes.get('/', getCoffee);
coffeeRoutes.get('/:coffee_id', authMiddleware,getCoffeeById);
coffeeRoutes.post('/', createCoffee);
coffeeRoutes.put('/:coffee_id', updateCoffee);
coffeeRoutes.delete('/:coffee_id', deleteCoffee);

export default coffeeRoutes;