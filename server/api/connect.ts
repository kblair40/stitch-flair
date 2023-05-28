import axios from "axios";

// const URL = "https://openapi.etsy.com/oauth/connect";
const url = "https://www.etsy.com/oauth/connect";

const handler = defineEventHandler(async (event) => {
  const params = getQuery(event);
  console.log("PARAMS:", params);
  //   const config = useRuntimeConfig();
  //   const headers = { "x-api-key": config.public.ETSY_KEYSTRING };

  //   return await axios.get(URL, { params });

  try {
    const res = await axios.get(url, { params });
    // console.log("RES:", res.data);
    console.log("KEYS:", Object.keys(res));
    console.log("KEYS DATA:", Object.keys(res.data));
    console.log("STATUS:", res.status);
    console.log("STATUS TEXT:", res.statusText);
    console.log("HEADERS:", res.headers);

    // not sure which of the two below to use
    // setResponseHeaders(event, res.headers)
    // if (res.headers) {
    //     appendResponseHeaders(event, res.headers)
    // }

    // Might be useful?
    // sendRedirect(event, "/oauth/redirect", 302);

    setResponseStatus(302);
    const redirectLoc =
      typeof params.redirect_uri === "string" ? params.redirect_uri : "/";

    // return await navigateTo("/oauth/redirect", {
    //   redirectCode: 302,
    //   external: true,
    // });

    console.log("redirectLoc:", redirectLoc);
    // return sendRedirect(event, redirectLoc, 302);
    return sendRedirect(event, "/oauth/redirect", 302);
    // return res.data;
    // return JSON.stringify(res.data);
  } catch (e) {
    console.log("\nERROR:", e);
    return {};
  }

  //   return await axios.get(url, { params });
  //   return await axios.get(url, { headers, params });
  //   const res = await axios.get(url, { headers });
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
