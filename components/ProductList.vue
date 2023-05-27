<script lang="ts" setup>
import { computed } from 'vue';

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

const fetchProducts = async () => {
    const { data } = await useFetch('/api/products')
    console.log('data1:', data)
    console.log('data2', data.value);
    console.log('data3', Object.keys(data))
    console.log('data4', data.value.results[1])
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