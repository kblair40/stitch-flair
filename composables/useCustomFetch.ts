import type { UseFetchOptions } from "nuxt/app";
import { defu } from "defu";
import { HttpsProxyAgent } from "https-proxy-agent";

export function useCustomFetch<T>(
  url: string,
  options: UseFetchOptions<T> = {}
) {
  const config = useRuntimeConfig();

  const baseURL =
    config.NODE_ENV === "dev" ? "http://localhost:3001/" : config.API_BASE_URL;

  const defaults: UseFetchOptions<T> = {
    baseURL,
    key: url, // cache request
  };

  if (process.env.NODE_ENV === "prod") {
    // @ts-ignore
    defaults["agent"] = new HttpsProxyAgent(config.API_BASE_URL);
  }

  // for deep default
  const params = defu(options, defaults);

  return useFetch(url, params);
}
