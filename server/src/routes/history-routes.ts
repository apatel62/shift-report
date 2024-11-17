import express from "express";
import { getMachineHistory } from "../controllers/history-controller.js";

const router = express.Router();

// GET / - Get report/machine history
router.get("/", getMachineHistory);

export { router as historyRouter };
