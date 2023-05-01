<script lang="ts" setup>
import { DUMMY_PRODUCT } from '../utils/constants';

const featuredProductClasses = [
    "w-full",
    "mt-4 flex flex-wrap justify-center",
]
const products = [DUMMY_PRODUCT, DUMMY_PRODUCT, DUMMY_PRODUCT, DUMMY_PRODUCT];
</script>

<template>
    <Page>
        <PageTitle>Welcome to Stitch Flair!</PageTitle>
        <!-- <template #header>Welcome to Stitch Flair!</template> -->


        <p class="px-4 md:px-6 lg:px-8 mt-5 leading-relaxed text-sm sm:text-base">
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
                <ProductFeatured v-for="product, i in products" :key="i" :price="product.price" :title="product.title"
                    :imgUrl="product.imgUrl" />
            </div>
        </div>
    </Page>
</template>