import { Router, Request, Response } from "express";

const router = Router();

async function createPDF(machineData: string[]) {
    try {
        const response = await fetch(
          "https://api.pdfmonkey.io/api/v1/documents",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.PDF_API_KEY}`,
            },
            body: JSON.stringify({
              document: {
              document_template_id: process.env.DOCUMENT_TEMPLATE_ID, // Template ID
              status: "pending",
              payload: {
                shiftTitle: 'Filtered Shift History',
                machineData
              },
              meta: {
                _filename: "filtered_history.pdf", // Desired filename of the generated PDF
              },
            }}),
          }
        );
  
        if (!response.ok) {
          const errorDetails = await response.json();
          console.error("Error from PDF Monkey API:", errorDetails);
          throw new Error(`PDF Monkey API error: ${response.status}`);
        }
        const result = await response.json();
        return result.document.id;
      } catch (error) {
        console.error("Error generating PDF:", error);
        throw error;
      }
 }

 async function getPDF(id: string) {
  console.log(id);
  try {
    const response = await fetch(
      `https://api.pdfmonkey.io/api/v1/documents/${id}`,
      {
        method: "GET", // HTTP method to fetch the document details
        headers: {
          Authorization: `Bearer ${process.env.PDF_API_KEY}`, // Authorization header with API key
          "Content-Type": "application/json", // Ensure content type is set to JSON
        },
      }
    );

    if (!response.ok) {
      const errorDetails = await response.json();
      console.error("Error fetching document details:", errorDetails);
      throw new Error(`Error fetching document details: ${response.status}`);
    }

    const result = await response.json(); // Parse the response as JSON
    if (result.document.download_url) {
      return result.document.download_url;
    }
  } catch (error) {
    console.error("Request failed:", error);
    throw error; // Rethrow error if needed
  }
 }

router.post("/create", async (req: Request, res: Response) => {
  try {
    const pdfResult = await createPDF(req.body);
    return res.json(pdfResult);
  } catch (error) {
    console.error("Error creating pdf:", error);
    return;
  }
});


router.post("/get", async (req: Request, res: Response) => {
  try {
    const pdfDownload = await getPDF(req.body.id);
    return res.json(pdfDownload);
  } catch (error) {
    console.error("Error creating pdf:", error);
    return;
  }
});

export default router;