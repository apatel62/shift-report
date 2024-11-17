import express from "express";
import { getMachineHistory } from "../controllers/history-controller.js";

const router = express.Router();

// POST / - report/machine history
router.post("/", getMachineHistory);

export { router as historyRouter };
