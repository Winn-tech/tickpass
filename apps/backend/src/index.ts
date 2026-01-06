import { handleError } from './../utils/errorHandler';
import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { authRoutes } from '../routes/authRoutes';
import cloudinary from '../utils/cloudinery';

import {eventsRoute} from '../routes/eventsroutes';

dotenv.config({ path: '../../config.env' });

const MONGO_URI = process.env.DATABASE_STRING?.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD || ''
);

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


app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new handleError(404, `Can't find ${req.originalUrl} on this server!`);
  next(error);
});

// / Global error handling middleware
app.use((err: handleError, req: Request, res: Response, next: NextFunction) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});
;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});