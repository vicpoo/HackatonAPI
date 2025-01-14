import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'; // Importar cors
import * as dotenv from 'dotenv';

// Importar rutas de módulos
import clientRoutes from './client/routes/clientRoutes';
import coffeeRoutes from './coffee/routes/coffeeRoutes';
import userRoutes from './user/routes/userRoutes';
import orderRoutes from './order/routes/orderRoutes';
import rolRoutes from './rol_user/routes/rol_userRoutes';
import orderCoffeeRoutes from './orderCoffee/routes/OrderCoffeeRoutes';

// Importar middlewares compartidos
import { errorHandler } from './shared/middlewares/errorHandler';
import { notFoundHandler } from './shared/middlewares/notFoundHandler';

// Configuración de variables de entorno
dotenv.config();

// Crear la aplicación de Express
const app: Application = express();
const port: number = parseInt(process.env.PORT as string, 10) || 3000;

// Middleware de análisis del cuerpo
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Habilitar CORS
app.use(cors());

// Rutas de los módulos
app.use('/api/client', clientRoutes);
app.use('/api/coffee', coffeeRoutes);
app.use('/api/user', userRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/rol', rolRoutes);
app.use('/api/order_coffee', orderCoffeeRoutes);

// Middleware para manejar rutas no encontradas
app.use(notFoundHandler);

// Middleware de manejo de errores
app.use(errorHandler);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
