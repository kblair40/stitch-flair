<script lang="ts" setup>
import { categories } from '../utils/constants';

const listClasses = [
    "flex flex-col",
    "h-full w-60",
    "border",
    "border-t"
]

const itemClasses = [
    "flex items-center justify-between px-2",
    // "leading-tight",
    // "border-l border-r border-b",
    "w-full h-12",
    "cursor-pointer",
    "hover:bg-white/50",
]
</script>

<template>
    <div :class="listClasses">
        <div v-for="category in categories" :key="category" :class="itemClasses">
            <p>{{ category }}</p>

            <p class="ml-4">{{ Math.floor(Math.random() * 26) }}</p>
        </div>
    </div>
</template>