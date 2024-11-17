import { Router } from "express";
import { userRouter } from "./user-routes.js";
import { machineRouter } from "./machine-routes.js";
import { reportRouter } from "./report-routes.js";

const router = Router();

router.use("/users", userRouter);

router.use("/machines", machineRouter);

router.use("/reports", reportRouter);

export default router;
