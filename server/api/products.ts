// const headers = { 'x-api-key': config.public.ETSY_KEYSTRING }
import axios from "axios";

const baseUrl = "https://openapi.etsy.com/v3/application/";
const shopId = "24956294";

const handler = defineEventHandler(async (event) => {
  console.log("EVENT KEYS:", Object.keys(event));
  const config = useRuntimeConfig();
  const headers = { "x-api-key": config.public.ETSY_KEYSTRING };
  //   const res = await axios.get(baseUrl + "seller-taxonomy/nodes", { headers });
  //   const res = await axios.get(baseUrl + "listings/active", { headers });
  //   const res = await axios.get(`${baseUrl}shops/${shopId}/listings/active`, {
  try {
    const res = await axios.get(`${baseUrl}shops/${shopId}/listings/active`, {
      headers,
    });
    // const res = await axios.get(`${baseUrl}shops?shop_name=stitchflair`, {
    //   headers,
    // });
    const { status, data } = res;
    console.log("\n\nRES:", { status, data });
    return data;
  } catch (e) {
    console.log("\nFetch failed:", e);
    return {};
  }
});

export default handler;
