import { model, Schema } from "mongoose";
import { IUser } from "./user.schema";
import { IProduct } from "./product.schema";

export interface IDonation {
  _id?: string;
  user: IUser;
  product: IProduct;
  amount: number;
}

const donationSchema = new Schema(
  {
    product: { type: Schema.Types.ObjectId, ref: "Product" },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    amount: { type: Number, require: true },
  },
  { _id: true }
);

const Donation = model<IDonation>("Donation", donationSchema);

export default Donation;
