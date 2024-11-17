import { Request, Response } from "express";
import { Machine } from "../models/machine.js";
import { Report } from "../models/report.js";

// GET /machines
export const getAllMachines = async (_req: Request, res: Response) => {
  try {
    const machines = await Machine.findAll({
      include: [
        {
          model: Report,
          as: "assignedReport",
          attributes: ["shiftNumber"], // may need to change what attribute we include
        },
      ],
    });
    res.json(machines);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// GET /machines/:id
export const getMachineById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const machine = await Machine.findByPk(id, {
      include: [
        {
          model: Report,
          as: "assignedReport",
          attributes: ["shiftNumber"], // may need to change what attribute we include
        },
      ],
    });
    if (machine) {
      res.json(machine);
    } else {
      res.status(404).json({ message: "Machine not found" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// POST /machines
export const createMachine = async (req: Request, res: Response) => {
  const { machine, machineStatus, partsMade, comments, assignedReportId } =
    req.body;
  try {
    const newMachine = await Machine.create({
      machine,
      machineStatus,
      partsMade,
      comments,
      assignedReportId,
    });
    res.status(201).json(newMachine);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// PUT /machine/:id
export const updateMachine = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { machine, machineStatus, partsMade, comments } = req.body;
  try {
    const updatedMachine = await Machine.findByPk(id);
    if (updatedMachine) {
      updatedMachine.machine = machine;
      updatedMachine.machineStatus = machineStatus;
      updatedMachine.partsMade = partsMade;
      updatedMachine.comments = comments;
      await updatedMachine.save();
      res.json(updatedMachine);
    } else {
      res.status(404).json({ message: "Machine not found" });
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE /machine/:id
export const deleteMachine = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const machine = await Machine.findByPk(id);
    if (machine) {
      await machine.destroy();
      res.json({ message: "Machine deleted" });
    } else {
      res.status(404).json({ message: "Machine not found" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllMachinesEmail = async (reportId: number) => {
  try {
    const machines = await Machine.findAll({
      include: [
        {
          model: Report,
          as: "assignedReport",
          attributes: ["shiftNumber"], // may need to change what attribute we include 
        },
      ],
      where: {
        assignedReportId: reportId
        },
    });
    // Return the fetched reports
    return machines.map((machine) => ({
      id: machine.id,
      machine: machine.machine,
      machineStatus: machine.machineStatus,
      partsMade: machine.partsMade,
      comments: machine.comments,
      assignedReportId: machine.assignedReportId,
    }));
  } catch (error: any) {
    console.error('Error fetching machines:', error.message);
    throw new Error('Failed to fetch machines');
  }
};
