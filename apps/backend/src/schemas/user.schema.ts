import { model, Schema } from "mongoose";
import { hash } from "bcryptjs";

export interface IUser {
  _id?: string;
  username: string;
  password: string;
  admin: boolean;
}

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    admin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { _id: true }
);

userSchema.pre("save", async function (next) {
  const hashPassword = await hash(this.password, 10);
  this.password = hashPassword;

  next();
});

const User = model<IUser>("User", userSchema);

export default User;
