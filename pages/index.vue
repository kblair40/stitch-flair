<script lang="ts" setup>
// dummy image 
// https://i.etsystatic.com/28392538/r/il/1e93fb/4819482414/il_340x270.4819482414_gh86.jpg
const product = {
    imgUrl: "https://i.etsystatic.com/28392538/r/il/1e93fb/4819482414/il_340x270.4819482414_gh86.jpg",
    title: "Stuffed Animal",
    price: 35
}

const featuredProductClasses = [
    "w-full",
    "mt-4 flex flex-wrap justify-center",
]
const products = [product, product, product, product];
</script>

<template>
    <Page>
        <template #header>Welcome to Stitch Flair!</template>

        <p class="mt-5 leading-relaxed text-sm sm:text-base">
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