import { defineStore } from "pinia";
// import { useRuntimeConfig } from "nuxt/app";
import axios from "axios";

import type { Category, Product } from "~~/utils/types";

// const config = useRuntimeConfig();
// const BASE_URL = config.API_BASE_URL;

export type ProductInfo = null | { id: number; idx: number };
export type CategoryInfo = null | { id: number; idx: number };
export type Info = null | { id: number; idx: number };
type DeleteRes = { status?: number; affected?: number; message?: string };

export const useAdminStore = defineStore("admin", {
  state: () => ({
    showConfirmModal: false,
    showEditProductModal: false,
    productToEdit: null as Product | null,
    productToDelete: null as Info,
    categoryToDelete: null as Info,
    deleting: null as Info,
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
    category: null as number | null,
  }),
  getters: {
    categoryProducts(state) {
      if (!state.category) return state.products.data;
      let products = state.products.data.filter((prod: Product) => {
        return prod.category_id === state.category;
      });

      return products;
    },
  },
  actions: {
    async getProducts() {
      try {
        this.products.loading = true;
        const res = await axios.get("http://localhost:3001/product");
        // console.log("\n\nProducts res:", res.data, "\n\n");
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
    updateCategory(id: number, title: string) {
      const foundCategory = this.categories.data.find((category: Category) => {
        return category.id === id;
      });
      if (foundCategory) foundCategory.title = title;
    },
    openConfirmModal(productOrCategory: "product" | "category", info: Info) {
      if (productOrCategory === "product") {
        this.productToDelete = info;
      } else {
        this.categoryToDelete = info;
      }
      this.showConfirmModal = true;
    },
    closeConfirmModal() {
      if (this.productToDelete) this.productToDelete = null;
      if (this.categoryToDelete) this.categoryToDelete = null;

      this.showConfirmModal = false;

      if (this.deleting) this.deleting = null;
    },
    openEditProductModal(productInfo: Info) {
      console.log("productInfo:", productInfo);
      if (productInfo === null) return;
      const { id, idx } = productInfo;
      let productToEdit = [...this.products.data][idx];
      if (productToEdit) {
        if (productToEdit.id === id) {
          this.productToEdit = productToEdit;
          this.showEditProductModal = true;
        } else {
          console.error(
            `Found product with id ${productToEdit.id}, but a product with id of ${id} was requested`
          );
        }
      } else {
        console.error("Could not find product");
      }
    },

    closeEditProductModal() {
      console.log("closing...");
      this.productToEdit = null;
      this.showEditProductModal = false;
    },
    async deleteCategory() {
      const id = this.categoryToDelete?.id;
      const idx = this.categoryToDelete?.idx;
      if (!id || typeof idx !== "number") return;

      try {
        this.showConfirmModal = false;
        this.deleting = this.categoryToDelete;
        const res = await useCustomFetch(`/category/${id}`, {
          method: "DELETE",
        });
        const resVal = res.data.value as DeleteRes;
        // console.log("resVal:", resVal);
        if (!resVal || !resVal.affected) {
          // console.log("error return");
          if (resVal?.message) throw resVal.message;
          else throw "Failed";
        }

        // copy categories, and delete from the copy
        const curCategories = [...this.categories.data];
        curCategories.splice(idx, 1);

        this.categoryToDelete = null;
        this.categories.data = curCategories;
        this.deleting = null;

        return true;
      } catch (e) {
        console.error(e);
        this.deleting = null;
        return false;
      }
    },
    async deleteProduct() {
      const id = this.productToDelete?.id;
      const idx = this.productToDelete?.idx;
      if (!id || typeof idx !== "number") return;

      try {
        this.showConfirmModal = false;
        this.deleting = this.productToDelete;
        const res = await useCustomFetch(`/product/${id}`, {
          method: "DELETE",
        });
        // console.log("\nDelete res:", res.data);

        // copy products, and delete from the copy
        const curProducts = [...this.products.data];
        curProducts.splice(idx, 1);

        this.productToDelete = null;
        this.products.data = curProducts;
        this.deleting = null;

        return res;
      } catch (e) {
        console.log("\nFailed to delete product");
        this.deleting = null;
        return false;
      }
    },
  },
});
