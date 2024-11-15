import { Router } from "express";
import authRoutes from "./auth-routes.js";
import authGmail from "./auth-gmail.js";
import apiRoutes from "./api/index.js";
import { authenticateToken } from "../middleware/auth.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/email", authGmail);

router.use("/api", authenticateToken, apiRoutes);

export default router;
