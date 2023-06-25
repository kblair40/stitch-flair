import { defineStore } from "pinia";
import axios from "axios";

import type {
  Category,
  Promotion,
  PromoColor,
  PopulatedProduct,
} from "~~/utils/types";

export type ProductInfo = null | { id: number; idx: number };
export type CategoryInfo = null | { id: number; idx: number };
export type Info = null | { id: number; idx: number };
type PromoUpdate = { text?: string; color?: PromoColor };

export const useAdminStore = defineStore("admin", {
  state: () => ({
    showConfirmModal: false,
    showEditProductModal: false,
    productToEdit: null as PopulatedProduct | null,
    productToEditIdx: null as number | null,
    productToDelete: null as Info,
    categoryToDelete: null as Info,
    promoToDelete: null as Info,
    deleting: null as Info,
    products: {
      loading: false,
      error: false,
      data: [] as PopulatedProduct[],
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
      let products = state.products.data.filter((prod: PopulatedProduct) => {
        return prod.category.id === state.category;
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
    updatePromotions(idx: number, promo: PromoUpdate) {
      const promoToEdit = { ...this.promotions.data[idx] };
      if (promo.text) promoToEdit.text = promo.text;
      if (promo.color) promoToEdit.color = promo.color;
      this.promotions.data[idx] = promoToEdit;
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
    removeCategory(id: number) {
      const catCopy = [...this.categories.data];
      const catIdx = catCopy.findIndex((cat) => cat.id === id);
      if (catIdx !== -1) {
        catCopy.splice(catIdx, 1);
        this.categories.data = catCopy;
      }
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

      const productsCopy = [...this.products.data];
      const { id, idx } = productInfo;

      let productToEdit, prodIdx;
      if (!!this.category) {
        prodIdx = productsCopy.findIndex((product) => product.id === id);
        if (prodIdx > -1) productToEdit = productsCopy[prodIdx];
      } else {
        productToEdit = [...this.products.data][idx];
      }

      if (!productToEdit) {
        console.error("Could not find product");
        return;
      }

      this.productToEdit = productToEdit;
      this.productToEditIdx = prodIdx ?? idx;
      this.showEditProductModal = true;
    },
    updateProducts(productVals: PopulatedProduct) {
      console.log("\n\nUpdate prods rcvd:", productVals);
      if (!productVals || typeof this.productToEditIdx !== "number") return;
      let products = [...this.products.data];
      let product = { ...this.productToEdit };
      if (!product || !Object.keys(product).length) {
        return console.log("\nNo product to update");
      }
      let productIdx = products.findIndex((p) => p.id === product.id);
      if (productIdx === -1) {
        console.error("\nCould not find product\n\n");
        return;
      }

      if (productVals.promo_ids) {
        if (!productVals.promo_ids.length) {
          productVals.promos = [];
        } else {
          const promos: (Promotion | undefined)[] = productVals.promo_ids
            .map((promoId) => {
              let promo: Promotion | undefined = this.promotions.data.find(
                (p) => p.id === promoId
              );
              console.log("\nMATCHED PROMO:", promo, "\n");
              return promo;
            })
            .filter(Boolean);

          productVals.promos = promos as Promotion[];
        }
      }

      products[productIdx] = productVals;
      this.products.data = products;
    },
    closeEditProductModal() {
      console.log("closing...");
      this.productToEdit = null;
      this.showEditProductModal = false;
    },
    async deletePromo() {
      if (!this.promoToDelete) return;
      const { id, idx } = this.promoToDelete;

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

        return true;
      } catch (e) {
        console.log("\nFailed to Delete Promo:", e);
        this.deleting = null;
        return false;
      }
    },
    async deleteProduct() {
      if (!this.productToDelete) return;
      const { id, idx } = this.productToDelete;
      if (!id || typeof idx !== "number") return;

      try {
        this.showConfirmModal = false;
        this.deleting = this.productToDelete;
        const res = await useCustomFetch(`/product/${id}`, {
          method: "DELETE",
        });
        console.log("\nDelete res:", res);

        this.deleting = null;

        return res.error.value ? false : res;
      } catch (e) {
        console.log("\nFailed to delete product");
        this.deleting = null;
        return false;
      }
    },
  },
});
