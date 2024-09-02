import { Request, Response } from "express";
import { compare } from "bcryptjs";
import User from "../../../schemas/user.schema";
import { generateToken } from "../../../utils/token.utils";
import jwt from "jsonwebtoken";
import { refreshTokenSecret } from "../../../constants/secrets";
import { GenerateTokenParams } from "../types/utils.types";

const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.json({
      status: "error",
      error: "Os campos de usuário e senha são obrigatórios!",
    });

  const user = await User.findOne({ username }).select("+password");

  if (!user || !(await compare(password, user.password))) {
    return res.json({ status: "error", error: "Usuário ou senha ivalidos" });
  }

  const refreshToken = generateToken({ userId: user.id }, "7d", "refresh");
  const accessToken = generateToken({ userId: user.id }, "15m", "access");

  return res
    .status(201)
    .json({ status: "success", data: { 
      username: user.username,
      admin: user.admin,
      refreshToken,
      accessToken 
    
    } });
};

const refreshToken = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  if (!refreshToken) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(
      refreshToken,
      refreshTokenSecret
    ) as GenerateTokenParams;

    const newRefreshToken = generateToken(
      { userId: decoded.userId },
      "7d",
      "refresh"
    );

    const accessToken = generateToken(
      { userId: decoded.userId },
      "15m",
      "access"
    );
    

    res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    return res.sendStatus(401);
  }
};

export default { login, refreshToken };
