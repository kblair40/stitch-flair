// import { useIntersectionStore } from "~~/store/intersectionStore";

// https://nuxt.com/docs/getting-started/routing#route-middleware
// https://nuxt.com/docs/guide/directory-structure/middleware
// const store = useIntersectionStore();

export default defineNuxtRouteMiddleware((to, from) => {
  console.log("\n\nMIDDLEWARE:", { to, from });
  // store.isIntersecting = false;
});
