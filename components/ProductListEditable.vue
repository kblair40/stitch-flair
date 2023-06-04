<script lang="ts" setup>
import { computed } from 'vue';

import type { Product } from '~/utils/types'
// import { useShopStore } from '~~/store/shopStore';

// const config = useRuntimeConfig();
// const store = useShopStore()

const { data: products, pending } = useCustomFetch<Product[]>('/product');

const productList = computed(() => {
    if (products.value && Array.isArray(products.value) && products.value.length) {
        return products.value.map((product: Product, i: number) => ({
            name: product.name,
            image_url: product.image_url,
            price: product.price,
            id: product.id,
            idx: i,
        }))
    }

    return [];
})

const deleteProduct = (idx: number) => {
    products.value?.splice(idx, 1);
}

const gridClasses = [
    'flex flex-col items-center space-y-4 md:space-y-0',
    'md:grid md:grid-cols-2 md:gap-3',
    'md:justify-center md:grid-flow-row',
    'lg:grid-cols-3 lg:gap-5'
]
</script>

<template>
    <div class="relative">
        <div class="flex justify-center">
            <div v-if="pending">
                <img class="animate-spin scale-200" src="/icons/loading.svg" />
            </div>

            <div :class="gridClasses" v-else-if="productList.length">
                <ProductListItemEditable @delete="deleteProduct" v-for="product in productList" v-bind="product" />
            </div>

            <div v-else-if="!pending && !productList.length">
                <p class="text-center font-medium tracking-wide -mt-8 text-lg">NO PRODUCTS</p>
            </div>
        </div>
    </div>
</template>