import { defineStore } from "pinia";

export const useIntersectionStore = defineStore("intersection", {
  state: () => ({
    isIntersecting: false as boolean,
  }),
  //   getters: {},
  actions: {
    setIsIntersecting(isIntersecting: boolean) {
      this.isIntersecting = isIntersecting;
    },
  },
});
