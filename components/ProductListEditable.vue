<script lang="ts" setup>
import { computed } from 'vue';

// import { DUMMY_PRODUCT } from '~~/utils/constants';
import { useShopStore } from '~~/store/shopStore';

const DUMMY_PRODUCT = {
  imgUrl:
    "https://i.etsystatic.com/28392538/r/il/1e93fb/4819482414/il_340x270.4819482414_gh86.jpg",
  title: "Stuffed Animal",
  price: 35,
};

const config = useRuntimeConfig();

const store = useShopStore()

const products = computed(() => {
    const category = store.selectedCategory;
    const catObj = store.categories.find(cat => cat.label === category);

    return catObj
        ? new Array(catObj.qty).map((_) => DUMMY_PRODUCT)
        : []
})

const { data } = useCustomFetch('/product');
watch(data, () => {
    console.log('DATA:', data.value)
})

// const fetchProducts = async () => {
//     try {
//         const res = await useCustomFetch('/product')
//         console.log('All Products:', res, '\n');
//     } catch (e) {
//         console.log('Failed to create product:', e)
//     }
// }

const gridClasses = [
    'flex flex-col items-center space-y-4 md:space-y-0',
    'md:grid md:grid-cols-2 md:gap-3',
    'md:justify-center md:grid-flow-row',
    'lg:grid-cols-3 lg:gap-5'
]
</script>

<template>
    <div class="relative">
        <div class="flex justify-center">
            <div :class="gridClasses">
                <ProductListItem v-bind="DUMMY_PRODUCT" v-for="product in products" />
            </div>
        </div>
    </div>
</template>