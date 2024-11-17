import { Router, Request, Response } from "express";
import {
  getAllReportsEmail,
  getReportByIdEmail,
} from "../controllers/report-controller.js";

import {
  getAllMachinesEmail,
} from "../controllers/machine-controller.js";

import { google } from "googleapis";

const formatDate = (date: Date): string => {
  const month = ("0" + (date.getMonth() + 1)).slice(-2); // Month is 0-indexed
  const day = ("0" + date.getDate()).slice(-2);
  const year = date.getFullYear();

  return `${month}-${day}-${year}`;
};

// Set up Gmail API
const gmail = google.gmail("v1");

// Function to authenticate and send email
async function sendEmail() {
  try {
    // Load credentials from environment variables
    const clientId = process.env.GMAIL_CLIENT_ID;
    const clientSecret = process.env.GMAIL_CLIENT_SECRET;
    const redirectUri = process.env.GMAIL_REDIRECT_URI;
    const refreshToken = process.env.GMAIL_REFRESH_TOKEN;

    if (!clientId || !clientSecret || !redirectUri || !refreshToken) {
      console.error("Missing required environment variables");
      return;
    }

    const auth = new google.auth.OAuth2(clientId, clientSecret, redirectUri);

    // Set the refresh token to authenticate
    auth.setCredentials({
      refresh_token: refreshToken,
    });

    google.options({ auth });

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


    // Email content
    const subject = "Shift Report";
    const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString(
      "base64"
    )}?=`;
    const messageParts = [
      "From: Arjun Patel <arjunpatel9217@gmail.com>",
      "To: Arjun Patel <arjunpatel9217@gmail.com>",
      "Content-Type: text/html; charset=utf-8", 
      "MIME-Version: 1.0",
      `Subject: ${utf8Subject}`,
      "",
      `<h1 style = "font-weight: 400">${dateFormatted} Shift ${shiftReport?.shiftNumber} Report</h1>`,
      ...machinesEmail,
    ];
    const message = messageParts.join("\n");

    // Base64url encode the message
    const encodedMessage = Buffer.from(message)
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    // Send the email
    const res = await gmail.users.messages.send({
      userId: "me",
      requestBody: {
        raw: encodedMessage,
      },
    });
    console.log("Message sent:", res.data);
    return res.data;
  } catch (error) {
    console.error("Error sending email:", error);
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