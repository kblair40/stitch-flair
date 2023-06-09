<script lang="ts" setup>
import { toTitleCase } from '~~/utils/helpers';
import type { PromoColor } from '~~/utils/types';

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
    promos?: { text: string; color: PromoColor }[];
    preview?: boolean;
}
const props = defineProps<Props>();
const cardClasses = [
    // "border border-blue-200",
    // xs = 320px
    'border',
    'sm:w-68',
    // 'md:w-'
    // 'md:w-68',
    // 'max-w-xs md:max-w-75',
    'min-w-75',
    "max-w-75",
    'md:max-w-75',
    'z-20 p-2 bg-white shadow-sm',
    "relative cursor-pointer group rounded-md",
]

const imgWrapperClasses = "flex justify-center items-center overflow-hidden w-full h-56 sm:h-56 lg:h-64 relative"
const imgClasses = [
    // "border border-red-200",
    "object-cover h-full rounded-sm group-hover:scale-105",
    "transition-transform duration-300",
    'w-full'
]
const nameClasses = [
    'leading-tight',
    'mt-2 min-h-5',
    'font-medium line-clamp-1 max-w-fit'
]
const onSaleClasses = 'italic text-sm ml-1 opacity-100 text-darkpeach'
const salePriceClasses = '';

const priceClasses = computed(() => ([
    props.on_sale ? 'line-through opacity-100 decoration-darkpeach/75 decoration-2 mr-3' : ''
]))

const handleClick = () => {
    if (props.preview) return;
    // window.open('https://www.etsy.com/shop/stitchflair', '_blank');
    window.open(props.etsy_url, '_blank');
}

const formatPrice = (price: string | null) => {
    if (price === '' || price === '$0.00') return '';
    else if (!price) return '0';

    if (price.startsWith('$')) price = price.slice(1);
    return parseFloat(price).toFixed(2);
}
const parseMoney = (value?: string | null) => {
    if (!value || value === '$0.00') return 0;
    return value.startsWith('$') ? parseFloat(value.slice(1)) : parseFloat(value);
}

const percentDiscount = computed(() => {
    if (!props.price || !props.on_sale_price || !props.on_sale) return '';

    console.log('Discount props:', {
        price: props.price,
        on_sale_price: props.on_sale_price,
        on_sale: props.on_sale,
        preview: props.preview
    })

    // slice(1) removes '$' so value can be parsed by parseFloat
    // const price = props.preview ? parseFloat(props.price) : parseFloat(props.price.slice(1));
    // const salePrice = props.preview ? parseFloat(props.on_sale_price) : parseFloat(props.on_sale_price.slice(1));
    const price = parseMoney(props.price);
    const salePrice = parseMoney(props.on_sale_price);

    const discountPercent = (price - salePrice) / price;

    return Math.floor(discountPercent * 100) + '%';
})

const chipWrapperClasses = 'flex flex-wrap mt-1 overflow-x-hidden absolute bottom-0 left-0.5'
</script>

<template>
    <div :class="cardClasses" @click="handleClick">
        <div :class="imgWrapperClasses">
            <img v-if="image_url" :src="image_url" :class="imgClasses" />
            <div v-else-if="preview"
                class="bg-slate-50 flex items-center justify-center w-full h-full rounded-sm border border-slate-200">
                <p class="opacity-30">Image Here</p>
            </div>

            <div v-if="promos && promos.length" :class="chipWrapperClasses">
                <div v-for="promo in promos" class="mb-1 mr-1">
                    <ChipPromo v-bind="promo" />
                </div>
            </div>
        </div>

        <p :class="nameClasses">{{ toTitleCase(name) }}</p>

        <div class="flex mt-0.5 font-semibold text-no-wrap h-6 overflow-hidden">
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