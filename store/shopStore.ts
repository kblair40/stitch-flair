import { defineStore } from "pinia";
import axios from "axios";

import type { Product, Category } from "~~/utils/types";
// import { categories as categoryList } from "~/utils/constants";

export const useShopStore = defineStore("shop", {
  state: () => ({
    selectedCategory: "All",
    // categories: categoryList.concat(categoryList).map((cat) => {
    //   return { label: cat, qty: Math.floor(Math.random() * 30) };
    // }),
    products: {
      loading: false,
      error: false,
      data: [] as Product[],
    },
    categories: {
      loading: false,
      error: false,
      data: [] as Category[],
    },
  }),
  getters: {
    // categories(state) {
    //   return categoryList.map((cat) => {
    //     return { label: cat, qty: Math.floor(Math.random() * 30) };
    //   });
    // },
  },
  actions: {
    setSelectedCategory(category: string) {
      this.selectedCategory = category;
    },
    async getProducts() {
      try {
        this.products.loading = true;
        const res = await axios.get("http://localhost:3001/product");
        console.log("\n\nProducts res:", res.data, "\n\n");
        if (res.data) this.products.data = res.data;
        this.products.loading = false;
        this.products.error = false;
      } catch (e) {
        this.products.error = true;
        this.products.loading = false;
        return;
      }
    },
    async getCategories() {
      try {
        this.categories.loading = true;
        const res = await axios.get("http://localhost:3001/category");
        console.log("\n\nCategories res:", res.data, "\n\n");
        if (res.data) this.categories.data = res.data;
        this.categories.loading = false;
        this.categories.error = false;
      } catch (e) {
        this.categories.error = true;
        this.categories.loading = false;
        return;
      }
    },
  },
});
