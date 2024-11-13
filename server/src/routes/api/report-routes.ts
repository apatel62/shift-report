import express from "express";
import {
  getAllReports,
  getReportById,
  createReport,
  updateReport,
  deleteReport,
} from "../../controllers/report-controller.js";

const router = express.Router();

// GET /reports - Get all reports
router.get("/", getAllReports);

// GET /reports/:id - Get a report by id
router.get("/:id", getReportById);

// POST /reports - Create a new report
router.post("/", createReport);

// PUT /reports/:id - Update a report by id
router.put("/:id", updateReport);

// DELETE /reports/:id - Delete a report by id
router.delete("/:id", deleteReport);

export { router as reportRouter };
