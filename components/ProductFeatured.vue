<script lang="ts" setup>
interface Props {
    title: string;
    imgUrl: string;
    price: number;
}
defineProps<Props>();

const cardClasses = [
    // "bg-blue-200", 
    "z-20 sm:mr-4 p-2",
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
    <div :class="cardClasses" class="product-card">
        <div :class="imgWrapperClasses">
            <img :src="imgUrl" :class="imgClasses" />
        </div>

        <p class="font-medium mt-2">{{ title }}</p>
        <p class="font-semibold mt-1">${{ price.toFixed(2) }}</p>
    </div>
</template>

<style scoped lang="css">
.product-card {
    max-width: max-content;
    width: 100%;
}

@media screen and (min-width:640px) {
    .product-card {
        width: calc(50% - 16px);
    }
}

@media screen and (min-width:960px) {
    .product-card {
        width: calc(33% - 16px);
    }
}

@media screen and (min-width:1200px) {
    .product-card {
        width: calc(25% - 16px);
    }
}
</style>