<script lang="ts" setup>
import { categories } from '../utils/constants';
import { useShopStore } from '../store/shopStore';

const store = useShopStore();

const listClasses = [
    "flex flex-col",
    "h-full w-full",
    "border",
    "border-t"
]

const itemClasses = [
    "flex items-center justify-between pl-4 pr-2",
    "w-full h-12 min-h-[40px]",
    "cursor-pointer",
    "hover:bg-white/50",
]
const selectedItemClasses = [
    ...itemClasses,
    'font-medium bg-white hover:bg-white',
    'border-y'
]
</script>

<template>
    <div :class="listClasses">
        <div 
            :class="store.selectedCategory === category.label ? selectedItemClasses : itemClasses" 
            @click="store.setSelectedCategory(category.label)" 
            v-for="category, i in store.categories" 
            :key="i"
        >
            <p>{{ category.label }}</p>

            <p class="ml-4">{{ category.qty }}</p>
        </div>
    </div>
</template>