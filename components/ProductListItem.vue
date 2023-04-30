<script lang="ts" setup>
interface Props {
    title: string;
    imgUrl: string;
    price: number;
}
defineProps<Props>();

const cardClasses = [
    // "bg-blue-200", 
    'z-20',
    "mb-4 sm:mr-4 p-2",
    "bg-white",
    "cursor-pointer group rounded-md",
]
const imgWrapperClasses = [
    "overflow-hidden",
    "w-full h-auto sm:h-56 lg:h-64",
]
const imgClasses = [
    "object-cover h-full rounded-sm",
    "group-hover:scale-105",
    "transition-transform duration-300"
]
</script>

<template>
    <div :class="cardClasses">
        <div :class="imgWrapperClasses">
            <img :src="imgUrl" :class="imgClasses" />
        </div>

        <p class="font-medium mt-2">{{ title }}</p>
        <p class="font-semibold mt-1">${{ price.toFixed(2) }}</p>
    </div>
</template>