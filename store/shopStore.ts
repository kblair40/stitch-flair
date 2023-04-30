import { defineStore } from "pinia";

import { categories as categoryList } from "~/utils/constants";

const toTitleCase = (str: string) => {
  return str[0].toUpperCase() + str.slice(1).toLowerCase();
};

export const useShopStore = defineStore("shop", {
  state: () => ({
    selectedCategory: "All",
    categories: categoryList.concat(categoryList).map((cat) => {
      return { label: cat, qty: Math.floor(Math.random() * 30) };
    }),
  }),
  getters: {
    categories(state) {
      return categoryList.concat(categoryList).map((cat) => {
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
