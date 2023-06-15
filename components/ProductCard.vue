<script lang="ts" setup>
import { toTitleCase } from '~~/utils/helpers';

interface Props {
    price: string;
    image_url: string;
    name: string;
    category_id: number;
    description?: string;
    featured: boolean;
    on_sale: boolean;
    on_sale_price?: null | string;
    etsy_url?: string;
    preview?: boolean;
}
const props = defineProps<Props>();
const cardClasses = [
    // "border border-blue-200",
    // xs = 320px
    'w-full max-w-xs md:max-w-75',
    'z-20 p-2 bg-white shadow-sm',
    "relative cursor-pointer group rounded-md",
]
const imgWrapperClasses = "overflow-hidden w-full h-56 sm:h-56 lg:h-64"
const imgClasses = [
    // "border border-red-200",
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
    return price ? parseFloat(price).toFixed(2) : '';
}

const percentDiscount = computed(() => {
    if (!props.price || !props.on_sale_price || !props.on_sale) return '';

    // slice(1) removes '$' so value can be parsed by parseFloat
    const price = props.preview ? parseFloat(props.price) : parseFloat(props.price.slice(1));
    const salePrice = props.preview ? parseFloat(props.on_sale_price) : parseFloat(props.on_sale_price.slice(1));

    const discountPercent = (price - salePrice) / price;

    return Math.floor(discountPercent * 100) + '%';
})
</script>

<template>
    <div :class="cardClasses">
        <div :class="imgWrapperClasses">
            <img :src="image_url" :class="imgClasses" />
        </div>

        <p :class="nameClasses">{{ toTitleCase(name) }}</p>
        <div class="flex mt-1 font-semibold text-no-wrap h-6 overflow-hidden">
            <p v-if="!preview" :class="priceClasses">{{ price }}</p>
            <p v-else :class="priceClasses">${{ formatPrice(price) }}</p>

            <p v-if="on_sale" :class="salePriceClasses">
                {{ preview && on_sale_price ? `$${formatPrice(on_sale_price)}` : on_sale_price ? on_sale_price : '' }}
                <span v-if="!preview" :class="onSaleClasses">{{ percentDiscount }} off!</span>
                <span v-else :class="onSaleClasses">{{ percentDiscount }} off!</span>
            </p>
        </div>

        <slot></slot>

    </div>
</template>