import { Router } from 'express';
import { getCoffee, getCoffeeById, createCoffee, updateCoffee, deleteCoffee, updateCoffeeStock} from '../controllers/coffeeControllers';

const coffeeRoutes: Router = Router();

coffeeRoutes.get('/', getCoffee);
coffeeRoutes.get('/:coffee_id',getCoffeeById);
coffeeRoutes.post('/', createCoffee);
coffeeRoutes.put('/:coffee_id', updateCoffee);
coffeeRoutes.delete('/:coffee_id', deleteCoffee);


//stock routa 
coffeeRoutes.put('/:coffee_id/stock', updateCoffeeStock);

export default coffeeRoutes;