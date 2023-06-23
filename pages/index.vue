<script lang="ts" setup>
import axios from 'axios';

import { useShopStore } from '~~/store/shopStore';
import { useCustomFetch } from '~~/composables/useCustomFetch';

const store = useShopStore();
store.getProducts();
store.getCategories();

const showErrorToast = ref(false);
const errorMsg = ref('Something went wrong')

const handleError = () => {
    showErrorToast.value = true;
    setTimeout(() => showErrorToast.value = false, 10000); // 10s
}

const content = ref();

const { data: text, error } = await useCustomFetch('/text');
console.log('Text/Error:', { text: toRaw(text.value), error: toRaw(error.value) });
if (error.value) handleError();
else content.value = { text: toRaw(text.value) }


const featuredProductClasses = [
    "w-full mt-4 flex flex-wrap justify-center",
    "space-y-4 md:space-y-0 md:space-x-4"
]
</script>

<template>
    <Page>
        <div class="h-10 mb-5">
            <PageTitle v-show="content && !!content.text">{{ content.text.homeTitle }}</PageTitle>
        </div>

        <div class="px-4 md:px-6 lg:px-8 mt-5 leading-relaxed text-sm md:text-mdsm"
            :class="content && !!content.text ? '' : 'min-h-14'">
            <p v-show="content && !!content.text">
                {{ content.text.homeText }}
            </p>
        </div>

        <div class="flex flex-col items-center">
            <h2 class="text-center font-serif mt-12 font-medium text-xl md:text-2xl tracking-wider">
                FEATURED PRODUCTS
            </h2>
            <div :class="featuredProductClasses">
                <ProductCard v-for="product, i in store.featuredProducts" :key="i" v-bind="product" />
            </div>
        </div>

        <Toast :visible="showErrorToast" :error="true">{{ errorMsg }}</Toast>
    </Page>
</template>

<style scoped lang="css">
p.home-text {
    margin: 0;
}
</style>