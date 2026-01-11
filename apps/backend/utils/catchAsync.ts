import { Request, Response, NextFunction } from "express";

export const catchAsync = function(fn:Function) {
  return function(req:Request, res:Response, next:NextFunction) {
    fn(req, res, next).catch(next);
  };
};
