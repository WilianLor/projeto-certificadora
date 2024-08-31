import { Router } from "express";

import authRoutes from "./modules/auth";
import userRoutes from "./modules/user";
import productRoutes from "./modules/product";
import donationRoutes from "./modules/donation";

const routes = Router();

routes.use("/auth", authRoutes);
routes.use("/user", userRoutes);
routes.use("/product", productRoutes);
routes.use("/donation", donationRoutes);

export default routes;
