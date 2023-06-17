import { defineStore } from "pinia";
// import { useRuntimeConfig } from "nuxt/app";
import axios from "axios";

import type { Category, Product, Promotion } from "~~/utils/types";

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
    productToEditIdx: null as number | null,
    productToDelete: null as Info,
    categoryToDelete: null as Info,
    promoToDelete: null as Info,
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
    promotions: {
      loading: false,
      error: false,
      data: [] as Promotion[],
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
    async getPromotions() {
      try {
        this.promotions.loading = true;
        const res = await axios.get("http://localhost:3001/promotion");
        console.log("\n\nPromotions res:", res.data, "\n\n");
        if (res.data) this.promotions.data = res.data;
        this.promotions.loading = false;
        this.promotions.error = false;
      } catch (e) {
        this.promotions.error = true;
        this.promotions.loading = false;
        return;
      }
    },
    addCategory(category: Category) {
      this.categories.data.push(category);
    },
    addPromotion(promo: Promotion) {
      this.promotions.data.push(promo);
    },
    updateCategory(id: number, title: string) {
      const foundCategory = this.categories.data.find((category: Category) => {
        return category.id === id;
      });
      if (foundCategory) foundCategory.title = title;
    },
    openConfirmModal(entity: "product" | "category" | "promo", info: Info) {
      if (entity === "product") {
        this.productToDelete = info;
      } else if (entity === "category") {
        this.categoryToDelete = info;
      } else {
        this.promoToDelete = info;
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
          this.productToEditIdx = idx;
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
    updateProducts(productVals: Product) {
      if (!productVals || typeof this.productToEditIdx !== "number") return;
      let products = [...this.products.data];
      let product = products[this.productToEditIdx];
      if (!product) return console.log("\nNo product to update");

      products[this.productToEditIdx] = productVals;
      this.products.data = products;
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
    async deletePromo() {
      if (!this.promoToDelete) return;
      const { id, idx } = this.promoToDelete;
      // console.log("Delete args:", { id, idx });

      try {
        this.showConfirmModal = false;
        this.deleting = this.promoToDelete;
        const res = await useCustomFetch(`/promotion/${id}`, {
          method: "DELETE",
        });
        console.log("\nDelete res:", res.data.value);

        // copy promos, and delete from the copy
        const curPromos = [...this.promotions.data];
        curPromos.splice(idx, 1);

        this.promoToDelete = null;
        this.promotions.data = curPromos;
        this.deleting = null;

        return res;
      } catch (e) {
        console.log("\nFailed to Delete Promo:", e);
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
