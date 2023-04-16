<script lang="ts" setup>
// dummy image 
// https://i.etsystatic.com/28392538/r/il/1e93fb/4819482414/il_340x270.4819482414_gh86.jpg
const product = {
    imgUrl: "https://i.etsystatic.com/28392538/r/il/1e93fb/4819482414/il_340x270.4819482414_gh86.jpg",
    title: "Stuffed Animal",
    price: 35
}

const featuredProductClasses = [
    "mt-4 grid",
    "gap-6",
    "grid-cols-2 grid-rows-2",
    "max-w-max mx-auto",
    // "border border-emerald-300"
]
</script>

<template>
    <div class="pt-4">
        <h1 class="font-serif tracking-wide font-semibold leading-none text-2xl sm:text-3xl md:text-4xl">
            Welcome to Stitch Flair!
        </h1>

        <p class="mt-5 leading-relaxed text-sm sm:text-base">
            Velit enim commodo adipisicing sunt aliquip officia do velit do voluptate ullamco. Elit nisi proident dolor sunt
            nisi esse sit eu fugiat cillum magna. Ut commodo fugiat quis consectetur culpa deserunt duis et irure magna
            laborum
            dolore officia. Mollit veniam in ipsum elit nostrud.
        </p>

        <div class="flex flex-col items-center">
            <h2 class="text-center font-serif mt-12 font-medium text-lg sm:text-xl md:text-2xl tracking-wider">
                FEATURED PRODUCTS
            </h2>
            <div :class="featuredProductClasses">
                <ProductFeatured :price="product.price" :title="product.title" :imgUrl="product.imgUrl" />
                <ProductFeatured :price="product.price" :title="product.title" :imgUrl="product.imgUrl" />
                <ProductFeatured :price="product.price" :title="product.title" :imgUrl="product.imgUrl" />
                <ProductFeatured :price="product.price" :title="product.title" :imgUrl="product.imgUrl" />
            </div>
        </div>
    </div>
</template>
