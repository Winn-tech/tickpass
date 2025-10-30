import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';


import {eventsRoute} from '../routes/eventsroutes';

dotenv.config({ path: '../../config.env' });

const MONGO_URI = process.env.DATABASE_STRING?.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD || ''
);

mongoose
  .connect(MONGO_URI || '')
  .then(() => console.log('✅ Database connected successfully'))
  .catch((err) => console.error('❌ Database connection failed:', err));


const app = express();
const PORT = process.env.PORT || 4000;



app.use(cors());
app.use(express.json());

// routes middlewares
app.use('/api/v1/events', eventsRoute)


app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'Backend is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});