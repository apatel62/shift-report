import { Report } from "../models/report.js";

export const seedReports = async () => {
  await Report.bulkCreate([
    {
      shiftNumber: "Shift 1",
      date: new Date("2024-11-16"),
      assignedUserId: 1,
    },
    {
      shiftNumber: "Shift 2",
      date: new Date("2024-11-16"),
      assignedUserId: 2,
    },
    {
      shiftNumber: "Shift 1",
      date: new Date(),
      assignedUserId: 3,
    },
    {
      shiftNumber: "Shift 2",
      date: new Date(),
      assignedUserId: 1,
    },
  ]);
};
