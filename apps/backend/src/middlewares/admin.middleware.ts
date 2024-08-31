import { NextFunction, Request, Response } from "express";
import { IUser } from "../schemas/user.schema";

const adminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user: IUser = (req as any).user;

  if (!user.admin) {
    return res.status(401).send("Acesso negado, você não é administrador.");
  }

  next();
};

export default adminMiddleware;
