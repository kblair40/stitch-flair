import { useIntersectionStore } from "~~/store/intersectionStore";

const store = useIntersectionStore();

export default defineNuxtRouteMiddleware((to, from) => {
  console.log("\n\nSETTING INTERSECTING TO FALSE:", { to, from });
  store.isIntersecting = false;
});
