import { Router } from "express";
import authRoutes from "./auth-routes.js";
//import authGmail from "./auth-gmail.js";
import authSendGrid from "./auth-sendGrid.js";
import apiRoutes from "./api/index.js";
import { authenticateToken } from "../middleware/auth.js";
import { historyRouter } from "./history-routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/email", authSendGrid);

router.use("/history", historyRouter);

router.use("/api", authenticateToken, apiRoutes);

export default router;
