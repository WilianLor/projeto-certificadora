import { Request, Response } from "express";
import Product from "../../../schemas/product.schema";

const createProduct = async (req: Request, res: Response) => {
  const { name } = req.body;

  if (!name) {
    return res.json({
      status: "error",
      message: "Campo nome é obrigatório",
    });
  }

  if (await Product.findOne({ name })) {
    return res.json({
      status: "error",
      message: "Nome de produto indisponível",
    });
  }

  const product = await Product.create({ name });

  return res.status(201).json({ status: "success", data: product });
};

const listProducts = async (req: Request, res: Response) => {
  const products = await Product.find();

  return res.status(200).json({ status: "success", data: products });
};

export default { createProduct, listProducts };
