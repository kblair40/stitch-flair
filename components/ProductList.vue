<script lang="ts" setup>
import { computed } from 'vue';
import axios from 'axios';

import { DUMMY_PRODUCT } from '~~/utils/constants';
import { useShopStore } from '~~/store/shopStore';

const config = useRuntimeConfig();

const store = useShopStore()

const products = computed(() => {
    const category = store.selectedCategory;
    const catObj = store.categories.find(cat => cat.label === category);

    return catObj
        ? new Array(catObj.qty).map((_) => DUMMY_PRODUCT)
        : []
})

console.log('ETSY_KEYSTRING:', config.public.ETSY_KEYSTRING)
const headers = { 'x-api-key': config.public.ETSY_KEYSTRING }
const baseUrl = "https://openapi.etsy.com/v3/application/"
const fetchProducts = async () => {
    let url = baseUrl + 'seller-taxonomy/nodes'
    try {
        const res = await axios.get(url, { headers });
        console.log('\nRES:', res);
    } catch (e) {
        console.log('Failed to fetch products:', e);
    }
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
        <button @click="fetchProducts" class="absolute w-8 h-8 rounded-full border">g</button>
        <div class="flex justify-center">
            <div :class="gridClasses">
                <ProductListItem v-bind="DUMMY_PRODUCT" v-for="product in products" />
            </div>
        </div>
    </div>
</template>