import axios from "axios";

// const URL = "https://openapi.etsy.com/oauth/connect";
const URL = "https://www.etsy.com/oauth/connect";

const handler = defineEventHandler(async (event) => {
  const params = getQuery(event);
  console.log("PARAMS:", params);
  //   const config = useRuntimeConfig();
  //   const headers = { "x-api-key": config.public.ETSY_KEYSTRING };

  return await axios.get(URL, { params });

  try {
    const res = await axios.get(URL, { params });
    console.log("RES:", res);
    return JSON.stringify(res);
  } catch (e) {
    console.log("\nERROR:", e);
    return {};
  }

  //   return await axios.get(URL, { params });
  //   return await axios.get(URL, { headers, params });
  //   const res = await axios.get(URL, { headers });
  //   return res;
  //   try {
  //     // const { status, data } = res;
  //     // console.log("\n\nRES:", { status, data });
  //     // return data;
  //   } catch (e) {
  //     console.log("\nFetch failed:", e);
  //     return {};
  //   }
});

export default handler;
