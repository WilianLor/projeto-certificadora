import { Request, Response } from "express";
import Product from "../../../schemas/product.schema";
import { CreateDonationData } from "../types";
import { IUser } from "../../../schemas/user.schema";
import Donation, { IDonation } from "../../../schemas/donation.schema";

const createDonation = async (req: Request, res: Response) => {
  const user = (req as any).user as IUser;
  const createDonationsData = req.body as CreateDonationData[];

  if (!Array.isArray(createDonationsData)) {
    return res.json({ status: "error", message: "Formato inválido dos dados" });
  }

  if (!createDonationsData.length) {
    return res.json({
      status: "error",
      message: "Envie pelo menos uma doação",
    });
  }

  const donations: IDonation[] = [];

  for await (const createDonationData of createDonationsData) {
    if (!createDonationData?.amount) {
      return res.json({
        status: "error",
        message: "Doe pelo menos um produto",
      });
    }

    if (!createDonationData.productId) {
      return res.json({
        status: "error",
        message: "Envie pelo menos uma doação",
      });
    }

    const product = await Product.findById(createDonationData.productId);

    if (!product) {
      return res.json({ status: "error", message: "Produto inválido" });
    }

    const donation = await Donation.create({
      product,
      user,
      amount: createDonationData.amount,
    });

    donations.push(donation);

    product.amount++;

    await product.save();
  }

  return res.status(201).json({ status: "success", data: donations });
};

const listDonations = async (req: Request, res: Response) => {
  const donations = await Donation.find();

  return res.status(200).json({ status: "success", data: donations });
};

const listUserDonations = async (req: Request, res: Response) => {
  const user = (req as any).user as IUser;

  const donations = await Donation.find({ user: { _id: user._id } });

  return res.status(200).json({ status: "success", data: donations });
};

export default { createDonation, listDonations, listUserDonations };
