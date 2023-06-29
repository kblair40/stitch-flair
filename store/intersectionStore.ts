import { defineStore } from "pinia";

export const useIntersectionStore = defineStore("intersection", {
  state: () => ({
    isIntersecting: true,
    allowChange: false,
  }),
  actions: {
    setIsIntersecting(isIntersecting: boolean) {
      if (!this.allowChange) {
        console.log("\nPREVENTING CHANGE:", isIntersecting, "\n");
        return;
      }
      this.isIntersecting = isIntersecting;
    },
    disableChange() {
      this.allowChange = false;
    },
    enableChange() {
      this.allowChange = true;
    },
  },
});
