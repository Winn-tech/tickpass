import { UserModel } from "../models/usersModel";
import { Request, Response } from "express";

export const signup = async (req: Request, res: Response) => {
    const UserData = req.body;
    try {
        const newUser = await UserModel.create(UserData);
        res.status(201).json({
            status: 'success',
            data: newUser,
        });
    } catch (error) {
        res.status(400).json({
                status: 'error',
                message: error
            });
    }
};