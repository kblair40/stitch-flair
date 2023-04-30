<script lang="ts" setup>
import { computed } from 'vue';

import { DUMMY_PRODUCT } from '~~/utils/constants';
import { useShopStore } from '~~/store/shopStore';

const store = useShopStore()

const products = computed(() => {
    const category = store.selectedCategory;
    const catObj = store.categories.find(cat => cat.label === category);

    return catObj
        ? new Array(catObj.qty).map(item => DUMMY_PRODUCT)
        : []
})

const gridClasses = [
    'border',
    'flex flex-col items-center',
    'justify-items-stretch',
    'md:grid md:grid-cols-2 md:gap-2'
    // 'grid'
]
</script>

<template>
    <div :class="gridClasses">
        <!-- <div class="w-full border border-blue-300" v-for="product in products"> -->
        <ProductListItem v-bind="DUMMY_PRODUCT" v-for="product in products" />
        <!-- <ProductFeatured v-bind="DUMMY_PRODUCT"  /> -->
        <!-- </div> -->
    </div>
</template>