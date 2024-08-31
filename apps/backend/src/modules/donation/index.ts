import { Router } from "express";

import donationController from "./controllers/donation.controller";
import authMiddleware from "../../middlewares/auth.middleware";
import adminMiddleware from "../../middlewares/admin.middleware";

const routes = Router();

routes.post("/", authMiddleware, donationController.createDonation);
routes.get(
  "/list",
  authMiddleware,
  adminMiddleware,
  donationController.listDonations
);
routes.get("/list-user", authMiddleware, donationController.listUserDonations);

export default routes;
