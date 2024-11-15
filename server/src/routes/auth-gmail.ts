import { Router, Request, Response } from "express";

import { google } from "googleapis";
// import { authenticate } from '@google-cloud/local-auth';

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

    // Email content
    const subject = "🤘 Hello 🤘";
    const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString(
      "base64"
    )}?=`;
    const messageParts = [
      "From: Arjun Patel <arjunpatel9217@gmail.com>",
      "To: Keaton Greer <keatongreer1@gmail.com>",
      "Content-Type: text/html; charset=utf-8",
      "MIME-Version: 1.0",
      `Subject: ${utf8Subject}`,
      "",
      "This is a message just to say hello.",
      "So... <b>Hello!</b>  🤘❤️😎",
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
