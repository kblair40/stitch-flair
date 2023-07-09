import { defineStore } from "pinia";
import axios from "axios";

import type { Product, Category } from "~~/utils/types";

export const useShopStore = defineStore("shop", {
  state: () => ({
    selectedCategory: "All",
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
    category: 0 as number | null,
  }),
  getters: {
    categoryProducts(state) {
      if (!state.category) return state.products.data;
      let products = state.products.data.filter((prod: Product) => {
        return prod.category_id === state.category;
      });

      return products;
    },
    featuredProducts(state) {
      return state.products.data.filter((product) => product.featured);
    },
  },
  actions: {
    setSelectedCategory(category: number | null) {
      this.category = category;
    },
    async getProducts() {
      const config = useRuntimeConfig();
      const baseURL = config.API_BASE_URL;

      try {
        this.products.loading = true;
        const res = await axios.get(`${baseURL}/product`);
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
      const config = useRuntimeConfig();
      const baseURL = config.API_BASE_URL;

      try {
        this.categories.loading = true;
        const res = await axios.get(`${baseURL}/category`);
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
    // async getProducts() {
    //   try {
    //     this.products.loading = true;
    //     const res = await axios.get("http://localhost:3001/product");
    //     console.log("\n\nProducts res:", res.data, "\n\n");
    //     if (res.data) this.products.data = res.data;
    //     this.products.loading = false;
    //     this.products.error = false;
    //   } catch (e) {
    //     this.products.error = true;
    //     this.products.loading = false;
    //     return;
    //   }
    // },
    // async getCategories() {
    //   try {
    //     this.categories.loading = true;
    //     const res = await axios.get("http://localhost:3001/category");
    //     console.log("\n\nCategories res:", res.data, "\n\n");
    //     if (res.data)
    //       this.categories.data = [{ title: "All", id: 0 }, ...res.data];
    //     this.categories.loading = false;
    //     this.categories.error = false;
    //   } catch (e) {
    //     this.categories.error = true;
    //     this.categories.loading = false;
    //     return;
    //   }
    // },
  },
});
