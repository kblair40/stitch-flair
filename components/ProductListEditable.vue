<script lang="ts" setup>
import { useAdminStore } from '~~/store/adminStore';
import type { Product, Category } from '~/utils/types'

const store = useAdminStore();
store.getProducts();
store.getCategories();
store.getPromotions();

const deletedProductIds = ref<number[]>([])

const productList = computed(() => {
    const products = store.categoryProducts.filter(prod => {
        return !deletedProductIds.value.includes(prod.id);
    })
    if (products && Array.isArray(products) && products.length) {
        // console.log('Products:', products);
        return products.map((product: Product, i: number) => ({
            ...product,
            idx: i
        }))
    }

    return [];
})

const categoryOptions = computed(() => {
    const { data: categories } = store.categories;
    if (categories && Array.isArray(categories) && categories.length) {
        // console.log('Categories:', categories);
        return categories.map((category: Category) => ({
            label: category.title,
            value: category.id,
        }))
    }

    return [];
})

const showErrorToast = ref(false);
const errorMsg = ref('');
const handleShowError = (msg: string) => {
    console.log('msg received by product list:', msg);
    errorMsg.value = msg;
    showErrorToast.value = true;
    setTimeout(() => {
        showErrorToast.value = false;
        errorMsg.value = '';
    }, 6000);
}

const handleDeleteProduct = async () => {
    const deleteRes = await store.deleteProduct();
    if (deleteRes && store.productToDelete) {
        deletedProductIds.value.push(store.productToDelete.id);
        store.productToDelete = null;
    }
}

const gridClasses = computed(() => {
    return [
        'flex flex-col items-center space-y-4 md:space-y-0',
        'md:grid md:grid-cols-2 md:gap-3 md:justify-center md:grid-flow-row',
        'lg:grid-cols-3 lg:gap-5',
    ]
})
</script>

<template>
    <div class="relative h-full pt-4">
        <Toast :error="true" :visible="showErrorToast">{{ errorMsg }}</Toast>

        <div class="flex justify-center h-18 mb-4">
            <div class="w-52 min-w-min">
                <FormKit :disabled="store.products.loading" type="select" label="Category"
                    :options="[{ label: 'Any Category', value: null }, ...categoryOptions]" v-model="store.category" />
            </div>
        </div>

        <div class="flex justify-center z-0">
            <div v-if="store.products.loading">
                <img class="animate-spin scale-200" src="/icons/loading.svg" />
            </div>

            <div :class="gridClasses" v-else-if="productList.length">
                <ProductListItemEditable v-for="product in productList" v-bind="product" :preview="true" />
            </div>

            <div v-else-if="!productList.length">
                <p class="text-center font-medium tracking-wide text-lg">NO PRODUCTS</p>
            </div>
        </div>

        <!-- <ModalConfirm v-if="store.showConfirmModal" @confirm="store.deleteProduct" @cancel="store.closeConfirmModal" /> -->
        <ModalConfirm v-if="store.showConfirmModal" @confirm="handleDeleteProduct" @cancel="store.closeConfirmModal" />
        <AdminEditProductModal @error="handleShowError" @close="store.closeEditProductModal"
            v-if="store.showEditProductModal" />
    </div>
</template>