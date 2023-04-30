<script lang="ts" setup>
import { useShopStore } from '../store/shopStore';

const store = useShopStore();

const listClasses = [
    "flex flex-col w-full",
    // "shadow-inner bg-white"
]

const itemClasses = [
    "flex items-center justify-between sm:pl-4 sm:pr-2 md:pr-6 md:pl-6",
    "text-sm md:text-mdsm font-medium",
    "w-full h-12 min-h-[40px] cursor-pointer",
    "cursor-pointer",
    "transition-colors duration-300 ease-in-out",
    "hover:bg-white/80",
    // "border-r-2 border-transparent hover:border-darkpeach-200",
]
const selectedItemClasses = [
    ...itemClasses,
    'font-semibold tracking-wide bg-white hover:bg-white',
    // 'border-darkpeach-200'
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

            <p class="ml-4 sm:hidden md:inline">{{ category.qty }}</p>
        </div>
    </div>
</template>