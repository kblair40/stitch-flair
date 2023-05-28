// const headers = { 'x-api-key': config.public.ETSY_KEYSTRING }
// const crypto = require("crypto");
import crypto from "crypto";

const genCode = () => {
  // The next two functions help us generate the code challenge
  // required by Etsy’s OAuth implementation.
  const base64URLEncode = (str: any) =>
    str
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=/g, "");

  const sha256 = (buffer: any) =>
    crypto.createHash("sha256").update(buffer).digest();

  // We’ll use the verifier to generate the challenge.
  // The verifier needs to be saved for a future step in the OAuth flow.
  const codeVerifier = base64URLEncode(crypto.randomBytes(32));

  // With these functions, we can generate
  // the values needed for our OAuth authorization grant.
  const codeChallenge = base64URLEncode(sha256(codeVerifier));
  const state = Math.random().toString(36).substring(7);

  //   console.log(`State: ${state}`);
  //   console.log(`Code challenge: ${codeChallenge}`);
  //   console.log(`Code verifier: ${codeVerifier}`);
  //   console.log(
  //     `Full URL: https://www.etsy.com/oauth/connect?response_type=code&redirect_uri=http://localhost:3003/oauth/redirect&scope=email_r&client_id=1aa2bb33c44d55eeeeee6fff&state=${state}&code_challenge=${codeChallenge}&code_challenge_method=S256`
  //   );

  return { codeVerifier, codeChallenge, state };
};

const baseUrl = "https://openapi.etsy.com/v3/application/";
const shopId = "24956294";

const handler = defineEventHandler(async (event) => {
  const { codeVerifier, codeChallenge, state } = genCode();
  return { codeVerifier, codeChallenge, state };
  console.log("EVENT KEYS:", Object.keys(event));
  const config = useRuntimeConfig();
  const headers = { "x-api-key": config.public.ETSY_KEYSTRING };
  //   const res = await axios.get(baseUrl + "seller-taxonomy/nodes", { headers });
  //   const res = await axios.get(baseUrl + "listings/active", { headers });
  //   const res = await axios.get(`${baseUrl}shops/${shopId}/listings/active`, {
  try {
    return {};
    // const { status, data } = res;
    // console.log("\n\nRES:", { status, data });
    // return data;
  } catch (e) {
    console.log("\nFetch failed:", e);
    return {};
  }
});

export default handler;
