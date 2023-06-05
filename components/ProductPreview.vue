<script lang="ts" setup>
interface Props {
    name: string;
    imgUrl: string;
    price: string | null;
}
defineProps<Props>();

const cardClasses = [
    // 'border border-gray-100',
    'z-20 p-2 bg-white shadow-sm',
    "min-w-75 w-75 max-w-75",
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
const nameClasses = [
    'font-medium mt-2 line-clamp-2 max-w-fit',

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

        <p :class="nameClasses">{{ name }}</p>
        <p class="font-semibold mt-1">${{ formatPrice(price) }}</p>
    </div>
</template>