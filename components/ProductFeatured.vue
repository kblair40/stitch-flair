<script lang="ts" setup>
interface Props {
    [key: string]: string | number | boolean | null | undefined;
    price: string;
    image_url: string;
    name: string;
    category_id: number;
    description?: string;
    featured: boolean;
    on_sale: boolean;
    on_sale_price?: null | string;
    etsy_url?: string;
}
const props = defineProps<Props>();

const cardClasses = [
    // "z-20 sm:mr-4 p-2 bg-white",
    // "cursor-pointer group rounded-md",
    'z-20 p-2 bg-white shadow-sm min-w-75 w-75 max-w-75',
    "cursor-pointer group rounded-md"
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

const nameClasses = 'font-medium mt-2 line-clamp-2 max-w-fit'
const onSaleClasses = 'italic text-sm ml-1 opacity-100 text-darkpeach'
const salePriceClasses = '';

const priceClasses = computed(() => ([
    props.on_sale ? 'line-through opacity-100 decoration-darkpeach/75 decoration-2 mr-3' : ''
]))
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