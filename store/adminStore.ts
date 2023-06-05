import { defineStore } from "pinia";

export type ProductInfo = null | { id: number; idx: number };

export const useAdminStore = defineStore("admin", {
  state: () => ({
    showConfirmModal: false,
    productToDelete: null as ProductInfo,
    deleting: null as ProductInfo,
  }),
  actions: {
    openConfirmModal(product: ProductInfo) {
      this.productToDelete = product;
      this.showConfirmModal = true;
    },
    closeConfirmModal() {
      this.showConfirmModal = false;
    },
    async deleteProduct() {
      try {
        const id = { ...this.productToDelete }["id"];
        this.showConfirmModal = false;
        this.deleting = this.productToDelete;
        const res = await useCustomFetch(`/product/${id}`, {
          method: "DELETE",
        });
        this.productToDelete = null;
        console.log("\nRes:", res.data);
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
