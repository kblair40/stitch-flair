<script lang="ts" setup>
interface Props {
    title: string;
    imgUrl: string;
    price: number;
}
defineProps<Props>();

const cardClasses = [
    "bg-blue bg-blue-200",
    "rounded-md p-2 w-full",
    "cursor-pointer group"
]
const imgWrapperClasses = [
    "overflow-hidden w-full",
    "h-40 sm:h-52 md:h-64"
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