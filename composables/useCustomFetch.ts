import type { UseFetchOptions } from "nuxt/app";
import { defu } from "defu";

export function useCustomFetch<T>(
  url: string,
  options: UseFetchOptions<T> = {}
) {
  const config = useRuntimeConfig();

  const baseURL =
    config.NODE_ENV === "dev" ? "http://localhost:3001/" : config.API_BASE_URL;

  const defaults: UseFetchOptions<T> = {
    // baseURL: config.API_BASE_URL,
    baseURL,
    // cache request
    key: url,
  };

  // for deep default
  const params = defu(options, defaults);

  return useFetch(url, params);
}
