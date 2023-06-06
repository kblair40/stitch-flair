import { defineStore } from "pinia";
// import { useRuntimeConfig } from "nuxt/app";
import axios from "axios";

// const config = useRuntimeConfig();
// const BASE_URL = config.API_BASE_URL;

export type ProductInfo = null | { id: number; idx: number };

export const useAdminStore = defineStore("admin", {
  state: () => ({
    showConfirmModal: false,
    productToDelete: null as ProductInfo,
    deleting: null as ProductInfo,
    products: {
      loading: false,
      error: false,
      data: [],
    },
  }),
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
    openConfirmModal(product: ProductInfo) {
      this.productToDelete = product;
      this.showConfirmModal = true;
    },
    closeConfirmModal() {
      this.productToDelete = null;
      this.showConfirmModal = false;
      if (this.deleting) this.deleting = null;
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
