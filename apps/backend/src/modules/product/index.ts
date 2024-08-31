import { Router } from "express";

import productController from "./controllers/product.controller";
import authMiddleware from "../../middlewares/auth.middleware";
import adminMiddleware from "../../middlewares/admin.middleware";

const routes = Router();

routes.post(
  "/",
  authMiddleware,
  adminMiddleware,
  productController.createProduct
);
routes.get("/list", authMiddleware, productController.listProducts);

export default routes;
