import { Request, Response } from "express";
import { Report } from "../models/report.js";
import { User } from "../models/user.js";

// GET /reports
export const getAllReports = async (_req: Request, res: Response) => {
  try {
    const reports = await Report.findAll({
      include: [
        {
          model: User,
          as: "assignedUser",
          attributes: ["username"],
        },
      ],
    });
    res.json(reports);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// GET /reports/:id
export const getReportById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const report = await Report.findByPk(id, {
      include: [
        {
          model: User,
          as: "assignedUser",
          attributes: ["username"],
        },
      ],
    });
    if (report) {
      res.json(report);
    } else {
      res.status(404).json({ message: "Report not found" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// POST /reports
export const createReport = async (req: Request, res: Response) => {
  const { shiftNumber, date, assignedUserId } = req.body;
  try {
    const newReport = await Report.create({
      shiftNumber,
      date,
      assignedUserId,
    });
    res.status(201).json(newReport);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// PUT /reports/:id
export const updateReport = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { shiftNumber, date, assignedUserId } = req.body;
  try {
    const report = await Report.findByPk(id);
    if (report) {
      report.shiftNumber = shiftNumber;
      report.date = date;
      report.assignedUserId = assignedUserId;
      await report.save();
      res.json(report);
    } else {
      res.status(404).json({ message: "Report not found" });
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE /reports/:id
export const deleteReport = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const report = await Report.findByPk(id);
    if (report) {
      await report.destroy();
      res.json({ message: "Report deleted" });
    } else {
      res.status(404).json({ message: "Report not found" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};


// GET /reports for sending email
export const getAllReportsEmail = async () => {
  try {
    // Query the database for reports and their assigned users
    const reports = await Report.findAll({
      include: [
        {
          model: User,
          as: "assignedUser", // Ensure that you have the association set up properly in Sequelize
          attributes: ["username"], // Only fetch the username field from the assigned user
        },
      ],
    });

    // Return the fetched reports
    return reports.map((report) => ({
      id: report.id,
      shiftNumber: report.shiftNumber,
      date: report.date,
      assignedUserId: report.assignedUserId,
    }));
  } catch (error: any) {
    console.error('Error fetching reports:', error.message);
    throw new Error('Failed to fetch reports');
  }
};

export const getReportByIdEmail = async (id: number) => {
  try {
    // Fetch the report with the associated assigned user
    const report = await Report.findByPk(id, {
      include: [
        {
          model: User,
          as: "assignedUser",
          attributes: ["username"],  // Only fetch the username field from the assigned user
        },
      ],
    });

    if (report) {
      // If the report is found, return it
      return {
        id: report.id,
        shiftNumber: report.shiftNumber,
        date: report.date,
        assignedUserId: report.assignedUserId,  // The username of the assigned user
      };
    } else {
      // If no report is found, return null
      return null;
    }
  } catch (error: any) {
    console.error("Error fetching report by ID:", error.message);
    throw new Error("Failed to fetch report by ID");
  }
};