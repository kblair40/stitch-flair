<script lang="ts" setup>
import { computed } from 'vue';

import { DUMMY_PRODUCT } from '~~/utils/constants';
import { useShopStore } from '~~/store/shopStore';

const store = useShopStore()

const products = computed(() => {
    const category = store.selectedCategory;
    const catObj = store.categories.find(cat => cat.label === category);
    if (catObj) {
        const { qty } = catObj;
        let res = [];
        for (let i = 0; i < qty; i++) {
            res.push(DUMMY_PRODUCT)
        }
        return res;
    } else {
        return [];
    }
})
</script>

<template>
    <div class="wrapper">
        <ProductFeatured v-bind="DUMMY_PRODUCT" v-for="product in products" />
    </div>
</template>