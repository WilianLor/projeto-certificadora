import { model, Schema } from "mongoose";

export interface IProduct {
  _id?: string;
  name: string;
  amount: number;
}

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    amount: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { _id: true }
);

const Product = model<IProduct>("Product", productSchema);
("");

export default Product;
