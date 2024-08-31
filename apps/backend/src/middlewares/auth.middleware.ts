import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { acessTokenSecret } from "../constants/secrets";
import { AccessTokenPayload } from "../types";
import User from "../schemas/user.schema";

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
    const decodedAccessToken = jwt.verify(
      accessToken || "",
      acessTokenSecret
    ) as AccessTokenPayload;

    const user = await User.findById(decodedAccessToken.userId);

    if (!user) {
      return res.status(401).send("Usuário não encontrado.");
    }

    (req as any).user = user;

    next();
  } catch (error) {
    return res.status(401).send("Acesso negado, token inválido.");
  }
};

export default authMiddleware;
