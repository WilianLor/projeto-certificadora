import { model, Schema } from "mongoose";
import { IUser } from "./user.schema";
import { IProduct } from "./product.schema";

export interface IDonation {
  _id?: string;
  user: IUser;
  product: IProduct;
  amount: number;
  created_at?: Date;
}

const donationSchema = new Schema(
  {
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
  },
  {
    _id: true,
    timestamps: { createdAt: 'created_at', updatedAt: false },
  }
);

const Donation = model<IDonation>("Donation", donationSchema);

export default Donation;
