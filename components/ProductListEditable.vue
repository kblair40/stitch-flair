<script lang="ts" setup>
import { computed } from 'vue';

import type { Product } from '~/utils/types'
// import { useShopStore } from '~~/store/shopStore';

// const config = useRuntimeConfig();
// const store = useShopStore()

const { data: products } = useCustomFetch<Promise<Product>>('/product');
watch(products, () => {
    console.log('PRODUCTS:', products.value)
})

const productList = computed(() => {
    if (products.value && Array.isArray(products.value) && products.value.length) {
        return products.value.map((product: Product) => ({
            name: product.name,
            image_url: product.image_url,
            price: product.price,
            id: product.id
        }))
    }

    return [];
})

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
            <div :class="gridClasses" v-if="productList.length">
                <ProductListItemEditable v-for="product in productList" v-bind="product" />
            </div>
        </div>
    </div>
</template>