<script lang="ts" setup>
// import { DUMMY_PRODUCT } from '../utils/constants';
import { useShopStore } from '~~/store/shopStore';
import { useCustomFetch } from '~~/composables/useCustomFetch';

const store = useShopStore();
store.getProducts();
store.getCategories();

const fetchText = async () => {
    try {
        const res = await useCustomFetch('/text')
        console.log('HOME PAGE TEXT:', res.data.value);
    } catch (e) {
        console.log('Failed to fetch homepage text:', e);
    }
}

onBeforeMount(() => fetchText())

const featuredProductClasses = [
    "w-full",
    "mt-4 flex flex-wrap justify-center",
    "space-y-4 md:space-y-0 md:space-x-4"
]
// const products = [DUMMY_PRODUCT, DUMMY_PRODUCT, DUMMY_PRODUCT, DUMMY_PRODUCT];
</script>

<template>
    <Page>
        <PageTitle>Welcome to Stitch Flair!</PageTitle>

        <button class="fixed bottom-2 left-2" @click="fetchText">text</button>


        <p class="px-4 md:px-6 lg:px-8 mt-5 leading-relaxed text-sm md:text-mdsm">
            Velit enim commodo adipisicing sunt aliquip officia do velit do voluptate ullamco. Elit nisi proident dolor
            sunt
            nisi esse sit eu fugiat cillum magna. Ut commodo fugiat quis consectetur culpa deserunt duis et irure magna
            laborum
            dolore officia. Mollit veniam in ipsum elit nostrud.
        </p>

        <div class="flex flex-col items-center">
            <h2 class="text-center font-serif mt-12 font-medium text-xl md:text-2xl tracking-wider">
                FEATURED PRODUCTS
            </h2>
            <div :class="featuredProductClasses">
                <ProductCard v-for="product, i in store.featuredProducts" :key="i" v-bind="product" />
            </div>
        </div>
    </Page>
</template>