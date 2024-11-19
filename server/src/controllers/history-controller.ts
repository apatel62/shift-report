import { Request, Response } from "express";
import { Machine } from "../models/machine.js";
import { Report } from "../models/report.js";
import { Sequelize } from "sequelize";
import { Op } from "sequelize";

export const getMachineHistory = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate, selectedMachines, interval } = req.body;

    if (!startDate || !endDate || !selectedMachines) {
      return res
        .status(400)
        .json({ message: "Start date and end date are required." });
    } else {
      const reports = await getFilteredReports(startDate, endDate);
      if (reports && interval === 1) {
        const machines = await getMachinesFromReports(
          reports,
          selectedMachines
        );
        return res.json(machines);
      } else if (reports && interval === 2){
        const machines = await getWeeklyMachinesFromReports(
          reports,
          selectedMachines
        );
        return res.json(machines);
      } else if (reports && interval === 3) {
        const machines = await getMonthlyMachinesFromReports(
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

const getFilteredReports = async (startDate: string, endDate: string) => {
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

const getWeeklyMachinesFromReports = async (
  reports: Report[],
  selectedMachines: string[]
) => {
  try {
    // Extract report IDs from the reports array
    const reportIds = reports.map((report) => report.id);

    // Query the machines with weekly aggregation
    const machines = await Machine.findAll({
      attributes: [
        [
          Sequelize.literal(`TO_CHAR("assignedReport"."date", 'IYYY-IW')`),
          "date", // Alias for the ISO Year-Week grouping
        ],
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
      group: [
        Sequelize.col("date"), // Group by ISO Year-Week
        "machine",
      ],
    });

    return machines;
  } catch (error: any) {
    console.error({ message: error.message });
    throw error;
  }
};


const getMonthlyMachinesFromReports = async (
  reports: Report[],
  selectedMachines: string[]
) => {
  try {
    // Extract report IDs from the reports array
    const reportIds = reports.map((report) => report.id);

    // Query the machines with monthly aggregation
    const machines = await Machine.findAll({
      attributes: [
        [
          Sequelize.literal(`TO_CHAR("assignedReport"."date", 'YYYY-MM')`),
          "date", // Alias for the Year-Month grouping
        ],
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
      group: [
        Sequelize.col("date"), // Use the alias from attributes
        Sequelize.col("machine"),
      ],
    });

    return machines;
  } catch (error: any) {
    console.error({ message: error.message });
    throw error;
  }
};
