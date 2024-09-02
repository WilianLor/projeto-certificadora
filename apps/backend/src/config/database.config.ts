import { connect } from "mongoose";

export const connectDatabase = async () => {
  try {
    await connect(String(process.env.MONGO_URI));

    console.log("[server]: MongoDB Connected");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
