import { Request, Response } from "express";
import { Machine } from "../models/machine.js";
import { Report } from "../models/report.js";
import { Sequelize } from "sequelize";
import { Op } from "sequelize";

export const getMachineHistory = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate, selectedMachines } = req.body;

    if (!startDate || !endDate || !selectedMachines) {
      return res
        .status(400)
        .json({ message: "Start date and end date are required." });
    } else {
      const reports = await getFilteredReports(startDate, endDate);
      if (reports) {
        const machines = await getMachinesFromReports(
          reports,
          selectedMachines
        );
        return res.json(machines);
      } else {
        return res.status(500).json({ message: "Cannot get reports" });
      }
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

const getFilteredReports = async (startDate: Date, endDate: Date) => {
  try {
    const reports = await Report.findAll({
      attributes: ["id", "date"],
      where: {
        date: {
          [Op.between]: [new Date(startDate), new Date(endDate)],
        },
      },
    });
    return reports;
  } catch (error: any) {
    console.log({ message: error.message });
    return;
  }
};

const getMachinesFromReports = async (
  reports: Report[],
  selectedMachines: string[]
) => {
  try {
    const reportIds = reports.map((report) => report.id);

    const machines = await Machine.findAll({
      attributes: [
        [Sequelize.col("assignedReport.date"), "date"],
        "machine", // Include the machine name
        [Sequelize.fn("SUM", Sequelize.col("partsMade")), "partsMade"], // Sum of partsMade
      ],
      include: [
        {
          model: Report, // Join with the Report table
          as: "assignedReport",
          attributes: [],
          where: {
            id: {
              [Op.in]: reportIds,
            },
          },
        },
      ],
      where: {
        machine: {
          [Op.in]: selectedMachines,
        },
      },
      group: ["assignedReport.date", "machine"],
    });

    return machines;
  } catch (error: any) {
    console.log({ message: error.message });
    throw error;
  }
};
