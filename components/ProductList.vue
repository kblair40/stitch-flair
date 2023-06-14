<script lang="ts" setup>
import { useShopStore } from '~~/store/shopStore';

const store = useShopStore();
store.getProducts();

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
            <div :class="gridClasses">
                <ProductCard v-for="product in store.categoryProducts" v-bind="product" />
            </div>
        </div>
    </div>
</template>