import dotenv from 'dotenv'
dotenv.config()

import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { authRoutes } from '../routes/authRoutes'
import { eventsRoute } from '../routes/eventsroutes'
import { AppError } from '../utils/appError'

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
}))
app.use(express.json())
app.use(cookieParser()) 
app.use('/api/v1/events', eventsRoute)
app.use('/api/v1/auth', authRoutes)

app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'Backend is running' })
})

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  const error = new AppError(`can't find ${req.originalUrl} on this server`, 404)
  next(error)
})

app.use((error: AppError, req: Request, res: Response, next: NextFunction) => {
  const statusCode = error.statusCode || 500
  const status = error.status || 'error'
  console.log(error.stack)
  res.status(statusCode).json({ status, message: error.message })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})