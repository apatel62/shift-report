import express from "express";
import { getMachineHistory } from "../controllers/history-controller.js";

const router = express.Router();

// POST 
router.post("/", getMachineHistory);

export { router as historyRouter };
