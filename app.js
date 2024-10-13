import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import errorMiddleware from './middleware/error.middleware.js';
import ConnectToDB from './config/dbConnection.js';
import morgan from 'morgan'

dotenv.config();

ConnectToDB();

const app = express();
app.use(express.json());

app.use('/assets', express.static(path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'assets')));
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true  
}));
app.use(morgan('dev'))


app.use(cookieParser());

app.use('/ping', (req, res) => {
    res.send('PONG');
});

/*import  all routes*/
import userRoutes from './routes/user.routes.js';
import productRoutes from './routes/products.routes.js'

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/products',productRoutes);

app.all('*', (req, res) => {
    res.status(404).send('OOPS!! 404 Page not found');
});

app.use(errorMiddleware);

export default app;
