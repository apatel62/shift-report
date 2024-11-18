import { Report } from "../models/report.js";

const currentDate = new Date();
const year = currentDate.getFullYear();
const month = currentDate.getMonth() + 1; // Adding 1 to make it 1-indexed
const day = currentDate.getDate();
const finalformattedDate = `${year}-${month}-${day}T00:00:00.000Z`;
  
export const seedReports = async () => {
  await Report.bulkCreate([
    {
      shiftNumber: "Shift 1",
      date: new Date("2024-11-16T00:00:00.000Z"),
      assignedUserId: 1,
    },
    {
      shiftNumber: "Shift 2",
      date: new Date("2024-11-16T00:00:00.000Z"),
      assignedUserId: 2,
    },
    {
      shiftNumber: "Shift 1",
      date: new Date(finalformattedDate),
      assignedUserId: 3,
    },
    {
      shiftNumber: "Shift 2",
      date: new Date(finalformattedDate),
      assignedUserId: 1,
    },
  ]);
};
