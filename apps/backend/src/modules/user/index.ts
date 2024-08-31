import { Router } from "express";

import userController from "./controllers/user.controller";
import authMiddleware from "../../middlewares/auth.middleware";
import adminMiddleware from "../../middlewares/admin.middleware";

const routes = Router();

routes.post("/", authMiddleware, adminMiddleware, userController.createUser);
routes.get("/", authMiddleware, userController.getUser);
routes.get("/list", authMiddleware, adminMiddleware, userController.listUsers);

export default routes;
