import express, { urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authrouter from './routes/auth.routes.js';
import foodpartnerrouter from './routes/foodpartnerroutes.js';
import  foodrouter from './routes/food.routes.js';
const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(cookieParser());

app.use(express.json());
app.use(urlencoded({ extended: true }));




app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use('/api/auth', authrouter);
app.use('/api/foodpartner', foodpartnerrouter);
app.use('/api/food', foodrouter);


export default app;