import { Request, Response, NextFunction } from 'express'
import jwt, { SignOptions, Secret } from 'jsonwebtoken'
import { AppError } from '../utils/appError'
import { catchAsync } from '../utils/catchAsync'
import {
  createUserService,
  findUserByEmailService,
  verifyUserPasswordService,
  findUserByIdService,
  incrementTokenVersionService
} from '../services/authServices'

// ─── Cookie Config (FIXED) ─────────────────────────────────────────────────────

const getCookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' as const : 'lax' as const,
  path: '/',
})

// ─── Token Helpers ─────────────────────────────────────────────────────────────

const generateToken = (userId: string, tokenVersion: number): string => {
  const secret = process.env.JWT_SECRET as Secret
  const expiresIn = (process.env.JWT_EXPIRES || '1d') as string

  if (!secret) {
    throw new AppError('JWT secret is not configured', 500)
  }

  return jwt.sign({ id: userId, tokenVersion }, secret, { expiresIn } as SignOptions)
}

const setTokenCookie = (res: Response, token: string) => {
  res.cookie('token', token, {
    ...getCookieOptions(),
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  })
}

const clearTokenCookie = (res: Response) => {
  res.cookie('token', '', {
    ...getCookieOptions(),
    expires: new Date(0),
  })
}

// ─── Controllers ──────────────────────────────────────────────────────────────

export const signUp = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const {
    firstName,
    lastName,
    businessName,
    email,
    phoneNumber,
    password,
    confirmPassword,
    userType
  } = req.body

  if (!email || !password || !phoneNumber || !userType) {
    return next(new AppError('Please fill in all required fields', 400))
  }

  if (password !== confirmPassword) {
    return next(new AppError('Passwords do not match', 400))
  }

  if (password.length < 8) {
    return next(new AppError('Password must be at least 8 characters', 400))
  }

  if (userType === 'personal' && (!firstName || !lastName)) {
    return next(new AppError('First name and last name are required for personal accounts', 400))
  }

  if (userType === 'business' && !businessName) {
    return next(new AppError('Business name is required for business accounts', 400))
  }

  try {
    const user = await createUserService({
      firstName,
      lastName,
      businessName,
      email,
      phoneNumber,
      password,
      userType,
    })

    const token = generateToken(user.id as string, 0)
    setTokenCookie(res, token)

    res.status(201).json({
      status: 'success',
      data: user
    })
  } catch (error: any) {
    if (error.message === 'EMAIL_TAKEN') {
      return next(new AppError('A user with this email already exists', 409))
    }

    return next(new AppError(error.message ?? 'Internal server error', 500))
  }
})

export const signIn = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body

  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400))
  }

  const user = await findUserByEmailService(email)

  if (!user) {
    return next(new AppError('Incorrect email or password', 401))
  }

  const isPasswordCorrect = await verifyUserPasswordService(password, user.password)

  if (!isPasswordCorrect) {
    return next(new AppError('Incorrect email or password', 401))
  }

  const token = generateToken(user.id, user.tokenVersion)
  setTokenCookie(res, token)

  const { password: _, tokenVersion, ...safeUser } = user

  res.status(200).json({
    status: 'success',
    data: safeUser
  })
})

export const signOut = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  clearTokenCookie(res)

  res.status(200).json({
    status: 'success',
    message: 'Logged out successfully'
  })
})

export const getMe = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const user = (req as any).user

  if (!user) {
    return next(new AppError('Not authenticated', 401))
  }

  const { password, tokenVersion, ...safeUser } = user

  res.status(200).json({
    status: 'success',
    data: safeUser
  })
})

export const protect = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.token

  if (!token) {
    return next(new AppError('You are not logged in', 401))
  }

  const secret = process.env.JWT_SECRET as Secret

  if (!secret) {
    return next(new AppError('JWT secret is not configured', 500))
  }

  let decoded: jwt.JwtPayload

  try {
    decoded = jwt.verify(token, secret) as jwt.JwtPayload
  } catch (error) {
    return next(new AppError('Invalid or expired token', 401))
  }

  if (!decoded.id || decoded.tokenVersion === undefined) {
    return next(new AppError('Invalid token payload', 401))
  }

  const user = await findUserByIdService(decoded.id)

  if (!user) {
    return next(new AppError('The user belonging to this token no longer exists', 401))
  }

  if (decoded.tokenVersion !== user.tokenVersion) {
    return next(new AppError('Session expired. Please log in again', 401))
  }

  ;(req as any).user = user
  next()
})

export const invalidateTokens = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const userId = (req as any).user?.id

  if (!userId) {
    return next(new AppError('You are not logged in', 401))
  }

  await incrementTokenVersionService(userId)

  clearTokenCookie(res)

  res.status(200).json({
    status: 'success',
    message: 'All sessions invalidated. Please log in again'
  })
})




// import { UserModel } from "../models/usersModel";
// import { Request, Response, NextFunction } from "express";
// import jwt, { SignOptions, Secret } from "jsonwebtoken";
// import bcrypt, { getSalt } from 'bcryptjs'
// import { catchAsync } from "../utils/catchAsync";
// import { AppError } from "../utils/appError";


// const generateToken = (userId: string): string => {
//   const secret = process.env.JWT_SECRET as Secret;
//   const expiresIn = process.env.JWT_EXPIRES || "1d";
//   if (!secret) {
//     throw new Error("JWT secret not set in environment variables");
//   }
//   return jwt.sign({ id: userId }, secret, { expiresIn } as SignOptions);
// };


// export const signUp = catchAsync(async (req: Request, res: Response) => {
//   const {
//     firstName,
//     lastName,
//     businessName,
//     email,
//     phoneNumber,
//     password,
//     confirmPassword,
//   } = req.body;

//   if (password !== confirmPassword) {
//     return res.status(400).json({
//       status: "fail",
//       message: "Passwords do not match",
//     });
//   }

//   const userType = businessName ? "business" : "personal";

//   const newUser = await UserModel.create({
//     firstName,
//     lastName,
//     businessName,
//     email,
//     phoneNumber,
//     password,
//     userType,
//   });

//   const token = generateToken(newUser._id.toString());

//   res.status(201).json({
//     status: "success",
//     data: {
//       _id: newUser._id,
//       firstName: newUser.firstName,
//       lastName: newUser.lastName,
//       businessName: newUser.businessName,
//       email: newUser.email,
//       phoneNumber: newUser.phoneNumber,
//       userType: newUser.userType,
//       role: newUser.role,
//       createdAt: newUser.createdAt,
//       token,
//     },
//   });
// });

// export const signIn = catchAsync(async (req:Request, res:Response, next:NextFunction)=>{
//      const {email, password} = req.body;
//       if(!email || !password){
//         return next('fill up fields')
//       }
//       const User = await  UserModel.findOne({email}).select('+password')
//       if (!User) {
//         return next('incorrect username or passowrd')
//       }
//       const correctPassword = await bcrypt.compare(password, User.password)
     
//       if (!correctPassword) {
//         return next('incorrect username or passowrd')
//       }
//        const token = generateToken(User._id.toString());
  
//       res.status(200).json({
//       status: "success",
//       token
//     });
// })

// export const protect = catchAsync(async (req:Request, res:Response, next:NextFunction)=>{
//      let token 
//      if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//         token = req.headers.authorization.split(' ')[1]
//      }
//      if (!token) {
//        return next( new AppError('You are not logged in', 401))
//      }
//      const decoded = jwt.verify(
//       token,
//       process.env.JWT_SECRET as jwt.Secret
//     )
//     if (typeof decoded === 'string' || !decoded.id) {
//       return next(new AppError('Invalid token', 401));
//     }
//      console.log(token, decoded)
//      next()
// })
// controllers/authController.ts