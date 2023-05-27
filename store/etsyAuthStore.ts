import { defineStore } from "pinia";

export const useEtsyAuthStore = defineStore("etsyAuth", {
  state: () => ({
    authState: {
      codeVerifier: "",
      codeChallenge: "",
      state: "",
    },
  }),
  //   getters: {},
  actions: {
    setState(newState: {
      codeVerifier: string;
      codeChallenge: string;
      state: string;
    }) {
      this.authState = newState;
    },
  },
});
