const sendEmail = async () => {
  try {
    const response = await fetch("/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    if (result.success) {
      console.log("Email sent successfully:", result.data);
    } else {
      console.error("Failed to send email:", result.message);
    }
  } catch (error) {
    console.error("Error calling send-email API:", error);
  }
};

export { sendEmail };
