import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { authRoutes } from '../routes/authRoutes';
import {eventsRoute} from '../routes/eventsroutes';
import { AppError } from '../utils/appError';

dotenv.config({ path: '../../config.env' });

const MONGO_URI = process.env.DATABASE_STRING?.replace(
  '<db_password>',
  process.env.DATABASE_PASSWORD || ''
);

console.log('DB STRING:', process.env.DATABASE_STRING);
console.log('DB PASSWORD EXISTS:', !!process.env.DATABASE_PASSWORD);
console.log('FINAL URI:', MONGO_URI);

mongoose
  .connect(MONGO_URI || '')
  .then(() => console.log('Database connected successfully'))
  .catch((err) => console.error('Database connection failed:', err));


const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// routes middlewares
app.use('/api/v1/events', eventsRoute)
app.use('/api/v1/auth', authRoutes)


app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'Backend is running' });
});

app.all('*', (req: Request, res: Response, next: NextFunction)=>{
  const error = new AppError(`can't find ${req.originalUrl} on this server`, 404);
  next(error);
})

app.use((error: AppError, req: Request, res: Response, next: NextFunction) => {
  const statusCode = error.statusCode || 500;
  const status = error.status || 'error';
  console.log(error.stack)
  res.status(statusCode).json({
    status,
    message: error.message
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});