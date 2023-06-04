<script lang="ts" setup>
interface Props {
    title: string;
    imgUrl: string;
    price: string | null;
}
defineProps<Props>();

const cardClasses = [
    'z-20 p-2',
    "bg-white",
    "min-w-75 max-w-max",
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

const formatPrice = (price: string | null) => {
    return price ? parseFloat(price).toFixed(2) : '';
}
</script>

<template>
    <div :class="cardClasses">
        <div :class="imgWrapperClasses">
            <img :src="imgUrl" :class="imgClasses" />
        </div>

        <p class="font-medium mt-2">{{ title }}</p>
        <p class="font-semibold mt-1">${{ formatPrice(price) }}</p>
    </div>
</template>