import { defineStore } from "pinia";

export type AuthState = {
  codeVerifier: string;
  codeChallenge: string;
  state: string;
};

export const useEtsyAuthStore = defineStore("etsyAuth", {
  state: () => ({
    authState: {
      codeVerifier: "",
      codeChallenge: "",
      state: "",
    } as AuthState,
  }),
  //   getters: {},
  actions: {
    setState(newState: AuthState) {
      console.log("newState:", newState);
      this.authState = newState;
    },
  },
});
