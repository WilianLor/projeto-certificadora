import { Request, Response } from "express";
import User from "../../../schemas/user.schema";

const createUser = async (req: Request, res: Response) => {
  const { username, password, admin } = req.body;

  if (!username || !password) {
    return res.json({
      status: "error",
      message: "Usuário e senha são campos obrigatórios",
    });
  }

  if (await User.findOne({ username })) {
    return res.json({
      status: "error",
      message: "Nome de usuário indisponível",
    });
  }

  const user = await User.create({ username, password, admin });

  return res.status(201).json({ status: "success", data: user });
};






const getUser = async (req: Request, res: Response) => {
  const { _id } = (req as any).user as any;

  const user = await User.findById(_id).select("-password");

  return res.status(200).json({ status: "success", data: user });
};

const listUsers = async (req: Request, res: Response) => {
  const users = await User.find().select("-password");

  return res.status(200).json({ status: "success", data: users });
};

export default { createUser, getUser, listUsers };
