const SIB = require("sib-api-v3-sdk");
SIB.ApiClient.instance.authentications["api-key"].apiKey = "YOUR_API_KEY";

export default defineEventHandler(async (event) => {
  try {
    const emailRes = await new SIB.TransactionalEmailsApi().sendTransacEmail({
      subject: "Hello from the Node SDK!",
      sender: { email: "api@sendinblue.com", name: "Sendinblue" },
      replyTo: { email: "api@sendinblue.com", name: "Sendinblue" },
      to: [{ name: "John Doe", email: "example@example.com" }],
      htmlContent:
        "<html><body><h1>This is a transactional email {{params.bodyMessage}}</h1></body></html>",
      params: { bodyMessage: "Made just for you!" },
    });

    console.log("EMAIL RES:", emailRes);
  } catch (e) {
    console.log("\nError sending email:", e);
  }
});
