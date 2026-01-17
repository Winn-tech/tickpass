import { UserModel } from "../models/usersModel";
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';
import { catchAsync } from "../utils/catchAsync";
import { AppError } from "../utils/appError";
const generateToken = (userId) => {
    const secret = process.env.JWT_SECRET;
    const expiresIn = process.env.JWT_EXPIRES || "1d";
    if (!secret) {
        throw new Error("JWT secret not set in environment variables");
    }
    return jwt.sign({ id: userId }, secret, { expiresIn });
};
export const signUp = catchAsync(async (req, res) => {
    const { firstName, lastName, businessName, email, phoneNumber, password, confirmPassword, } = req.body;
    if (password !== confirmPassword) {
        return res.status(400).json({
            status: "fail",
            message: "Passwords do not match",
        });
    }
    const userType = businessName ? "business" : "personal";
    const newUser = await UserModel.create({
        firstName,
        lastName,
        businessName,
        email,
        phoneNumber,
        password,
        userType,
    });
    const token = generateToken(newUser._id.toString());
    res.status(201).json({
        status: "success",
        data: {
            _id: newUser._id,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            businessName: newUser.businessName,
            email: newUser.email,
            phoneNumber: newUser.phoneNumber,
            userType: newUser.userType,
            role: newUser.role,
            createdAt: newUser.createdAt,
            token,
        },
    });
});
export const signIn = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next('fill up fields');
    }
    const User = await UserModel.findOne({ email }).select('+password');
    if (!User) {
        return next('incorrect username or passowrd');
    }
    const correctPassword = await bcrypt.compare(password, User.password);
    if (!correctPassword) {
        return next('incorrect username or passowrd');
    }
    const token = generateToken(User._id.toString());
    res.status(200).json({
        status: "success",
        token
    });
});
export const protect = catchAsync(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
        return next(new AppError('You are not logged in', 401));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (typeof decoded === 'string' || !decoded.id) {
        return next(new AppError('Invalid token', 401));
    }
    console.log(token, decoded);
    next();
});
