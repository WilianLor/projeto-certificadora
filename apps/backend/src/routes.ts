import { Router } from "express";

import authRoutes from "./modules/auth";

const routes = Router();

routes.use("/auth", authRoutes);

export default routes;
