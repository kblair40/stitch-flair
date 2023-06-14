import { defineStore } from "pinia";

import { categories as categoryList } from "~/utils/constants";

export const useShopStore = defineStore("shop", {
  state: () => ({
    selectedCategory: "All",
    categories: categoryList.concat(categoryList).map((cat) => {
      return { label: cat, qty: Math.floor(Math.random() * 30) };
    }),
  }),
  getters: {
    categories(state) {
      return categoryList.map((cat) => {
        return { label: cat, qty: Math.floor(Math.random() * 30) };
      });
    },
  },
  actions: {
    setSelectedCategory(category: string) {
      this.selectedCategory = category;
    },
  },
});
