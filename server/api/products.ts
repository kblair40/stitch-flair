// const headers = { 'x-api-key': config.public.ETSY_KEYSTRING }
import axios from "axios";

const baseUrl = "https://openapi.etsy.com/v3/application/";

const handler = defineEventHandler(async (event) => {
  console.log("EVENT KEYS:", Object.keys(event));
  const config = useRuntimeConfig();
  const headers = { "x-api-key": config.public.ETSY_KEYSTRING };
  const res = await axios.get(baseUrl + "seller-taxonomy/nodes", { headers });
  const { status, data } = res;
  console.log("\n\nRES:", { status, data });
  return data;
});

export default handler;
