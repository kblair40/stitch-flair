<script lang="ts" setup>
import { toTitleCase } from '~~/utils/helpers';

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
    'z-20 p-2 bg-white shadow-sm min-w-75 w-75 max-w-75',
    "relative cursor-pointer group rounded-md",
]
const imgWrapperClasses = "overflow-hidden w-full h-auto sm:h-56 lg:h-64"
const imgClasses = [
    "object-cover h-full rounded-sm group-hover:scale-105",
    "transition-transform duration-300"
]
const nameClasses = 'font-medium mt-2 line-clamp-2 max-w-fit'
const onSaleClasses = 'italic text-sm ml-1 opacity-100 text-darkpeach'
const salePriceClasses = '';

const priceClasses = computed(() => ([
    props.on_sale ? 'line-through opacity-100 decoration-darkpeach/75 decoration-2 mr-3' : ''
]))

const formatPrice = (price: string | null) => {
    console.log('Formatting', price, typeof price)
    return price ? parseFloat(price).toFixed(2) : '';
}
const percentDiscount = computed(() => {
    if (!props.price || !props.on_sale_price || !props.on_sale) return '';
    const price = typeof props.price === 'string' ? parseFloat(props.price) : 0;
    const salePrice = typeof props.on_sale_price === 'string' ? parseFloat(props.on_sale_price) : 0;
    const discountAmount = price - salePrice;
    const discountPercent = discountAmount / price;
    // const discountPercent = price / discountAmount;
    return Math.floor(discountPercent * 100) + '%';
})
</script>

<template>
    <div :class="cardClasses">
        <div :class="imgWrapperClasses">
            <img :src="image_url" :class="imgClasses" />
        </div>

        <p :class="nameClasses">{{ toTitleCase(name) }}</p>
        <div class="flex">
            <p :class="priceClasses" class="font-semibold mt-1">{{ price }}</p>

            <p v-if="on_sale" :class="salePriceClasses" class="font-semibold mt-1">
                ${{ formatPrice(on_sale_price) }}
                <span :class="onSaleClasses">{{ percentDiscount }} off!</span>
            </p>
        </div>

        <slot></slot>

    </div>
</template>