import { Machine } from "../models/machine.js";

export const seedMachines = async () => {
  await Machine.bulkCreate([
    {
      machine: "Machine 1",
      machineStatus: "UP",
      partsMade: 1500,
      assignedReportId: 1,
    },
    {
      machine: "Machine 2",
      machineStatus: "DOWN",
      partsMade: 750,
      comments: "Machine 2 went down for a little while",
      assignedReportId: 1,
    },
    {
      machine: "Machine 1",
      machineStatus: "DOWN",
      partsMade: 500,
      comments: "Machine 1 blew up",
      assignedReportId: 2,
    },
    {
      machine: "Machine 2",
      machineStatus: "UP",
      partsMade: 750,
      assignedReportId: 2,
    },
  ]);
};
