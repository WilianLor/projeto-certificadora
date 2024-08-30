import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { acessTokenSecret } from "../constants/secrets.contants";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.headers["authorization"];

  if (!accessToken) {
    return res.status(401).send("Acesso negado, token não informado.");
  }

  try {
    jwt.verify(accessToken || "", acessTokenSecret);

    next();
  } catch (error) {
    return res.status(401).send("Acesso negado, token inválido.");
  }
};

export default authMiddleware;
