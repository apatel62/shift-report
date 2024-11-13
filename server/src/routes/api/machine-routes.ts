import express from "express";
import {
  getAllMachines,
  getMachineById,
  createMachine,
  updateMachine,
  deleteMachine,
} from "../../controllers/machine-controller.js";

const router = express.Router();

// GET /machines - Get all machines
router.get("/", getAllMachines);

// GET /machines/:id - Get a machine by id
router.get("/:id", getMachineById);

// POST /machines - Create a new machine
router.post("/", createMachine);

// PUT /machines/:id - Update a machine by id
router.put("/:id", updateMachine);

// DELETE /machines/:id - Delete a machine by id
router.delete("/:id", deleteMachine);

export { router as machineRouter };
