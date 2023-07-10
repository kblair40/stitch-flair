// const SIB = require("sib-api-v3-sdk");
import * as SIB from "@sendinblue/client";

// let defaultClient = SIB.ApiClient.instance;

// SIB.ApiClient.instance.authentications["api-key"].apiKey = "YOUR_API_KEY";

export default defineEventHandler(async (event) => {
  const apiInstance = new SIB.AccountApi();
  console.log("\nINSTANCE:", apiInstance, "\n");
  const config = useRuntimeConfig();
  // let defaultClient = SIB.ApiClient.instance;
  // apiInstance.setApiKey(SIB.AccountApiApiKeys, config.EMAIL_API_KEY);
  const sender = new SIB.SendSmtpEmail();
  const api = new SIB.TransactionalEmailsApi();
  const key = config.EMAIL_API_KEY;

  // let apiKey = defaultClient.authentications["api-key"];
  // apiKey.apiKey = "YOUR API KEY";

  SIB.CreateSmtpEmail;
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
