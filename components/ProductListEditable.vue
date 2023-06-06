<script lang="ts" setup>
import { useAdminStore } from '~~/store/adminStore';
import type { Product } from '~/utils/types'

// const config = useRuntimeConfig();
const store = useAdminStore();
store.getProducts();

const productList = computed(() => {
    const { data: products } = store.products;
    if (products && Array.isArray(products) && products.length) {
        console.log('Products:', products);
        return products.map((product: Product, i: number) => ({
            name: product.name,
            image_url: product.image_url,
            price: product.price,
            id: product.id,
            idx: i,
        }))
    }

    return [];
})

const gridClasses = computed(() => {
    return [
        'flex flex-col items-center space-y-4 md:space-y-0',
        'md:grid md:grid-cols-2 md:gap-3',
        'md:justify-center md:grid-flow-row',
        'lg:grid-cols-3 lg:gap-5',
    ]
})
</script>

<template>
    <!-- <div class="relative border border-red-500 h-full pt-4">
        <div class="flex justify-center z-0 border border-blue-500"> -->
    <div class="relative h-full pt-4">
        <div class="flex justify-center z-0">
            <!-- <div v-if="pending"> -->
            <div v-if="store.products.loading">
                <img class="animate-spin scale-200" src="/icons/loading.svg" />
            </div>

            <div :class="gridClasses" v-else-if="productList.length">
                <ProductListItemEditable v-for="product in productList" v-bind="product" />
            </div>

            <!-- <div v-else-if="!pending && !productList.length"> -->
            <div v-else-if="!store.products.loading && !productList.length">
                <p class="text-center font-medium tracking-wide text-lg">NO PRODUCTS</p>
            </div>
        </div>

        <ModalConfirm />
    </div>
</template>