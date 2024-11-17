import { Machine } from "../models/machine.js";

export const seedMachines = async () => {
  await Machine.bulkCreate([
    {
      machine: "Machine 1",
      machineStatus: "UP",
      partsMade: 200,
      assignedReportId: 1,
    },
    {
      machine: "Machine 2",
      machineStatus: "DOWN",
      partsMade: 300,
      comments: "Machine 2 went down for a little while",
      assignedReportId: 1,
    },
    {
      machine: "Machine 2",
      machineStatus: "DOWN",
      partsMade: 400,
      comments: "Machine 1 blew up",
      assignedReportId: 2,
    },
    {
      machine: "Machine 3",
      machineStatus: "UP",
      partsMade: 500,
      assignedReportId: 2,
    },
    {
      machine: "Machine 3",
      machineStatus: "DOWN",
      partsMade: 600,
      comments: "Machine 3 exploded",
      assignedReportId: 3,
    },
    {
      machine: "Machine 4",
      machineStatus: "UP",
      partsMade: 700,
      assignedReportId: 3,
    },
    {
      machine: "Machine 4",
      machineStatus: "DOWN",
      partsMade: 800,
      comments: "Machine 4 needs maintenance",
      assignedReportId: 4,
    },
    {
      machine: "Machine 5",
      machineStatus: "UP",
      partsMade: 900,
      assignedReportId: 4,
    },
  ]);
};
