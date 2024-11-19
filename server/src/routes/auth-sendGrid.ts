import { Router, Request, Response } from "express";
import {
  getAllReportsEmail,
  getReportByIdEmail,
} from "../controllers/report-controller.js";

import {
  getAllMachinesEmail,
} from "../controllers/machine-controller.js";

import sgMail  from "@sendgrid/mail";
sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

const formatDate = (date: Date): string => {
  const month = ("0" + (date.getMonth() + 1)).slice(-2); // Month is 0-indexed
  const day = ("0" + date.getDate()).slice(-2);
  const year = date.getFullYear();

  return `${month}-${day}-${year}`;
};


// Function to authenticate and send email
async function sendEmail() {
  try {
    //grabbing the report and machine info
    const allReports = await getAllReportsEmail();
    const shiftReport = await getReportByIdEmail(allReports.length); //grabs the latest shift report saved which is the one that needs to be emailed
    let dateFormatted: string = "";
    if (shiftReport) {
      dateFormatted = formatDate(shiftReport.date);
    }
    const allMachines = await getAllMachinesEmail(allReports.length);
    let machinesEmail = allMachines.map(machine => {
      return `<p style = "font-weight: 200">${machine.machine} - Status: ${machine.machineStatus} Parts Made: ${machine.partsMade} ${machine.comments ? `Comments: ${machine.comments}` : ""}</p>`;
    });

    let emailHTML = [`<h1 style = "font-weight: 400">${dateFormatted} Shift ${shiftReport?.shiftNumber} Report</h1>`, ...machinesEmail];
    console.log(emailHTML.join("\n"));
    const recipients = [
      'arjunpatel9217@gmail.com',
      'keatongreer1@gmail.com',
      'desmil.co@gmail.com',
    ];
    const msg = {
      to: recipients,
      from: 'arjunpatel9217@gmail.com', // Use the email address or domain you verified above
      subject: 'Shift Report',
      html: emailHTML.join("\n"),
    };

    await sgMail.send(msg);

    } catch (error: any) {
      console.error(error);

      if (error.response) {
        console.error(error.response.body)
      }
    return;
  }
}

const router = Router();

router.post("/send", async (_req: Request, res: Response) => {
  try {
    const emailResult = await sendEmail();
    res.status(200).json({ success: true, data: emailResult });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, message: "Failed to send email" });
  }
});

export default router;