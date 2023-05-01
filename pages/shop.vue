<script lang="ts" setup>
const menuWrapperClasses = [
    'hidden sm:block',
    // 'absolute top-0 left-0 bottom-0 right-0',
    // "h-full",
    'lg:pl-2',
    "border border-purple-700",
    'w-48 md:w-60 lg:w-76',
    // 'w-full',
    // 'overflow-y-auto'
]
const contentWrapperClasses = [
    // "overflow-y-auto",
    "w-screen h-full",
    // "sm:pl-48 md:pl-60 lg:pl-76",
    "bottom-0",
    // "-ml-8 sm:-ml-0 sm:pl-48 md:pl-60 lg:pl-76",
    "border border-emerald-500"
]
const mainContentClasses = [
    'px-4 md:px-6',
    "w-full",
    'border border-red-500'
]
const menuAndContentWrapperClasses = [
    "border border-blue-500",
    "flex w-full h-full",
]
</script>

<template>
    <Page>
        <!-- <template #header>Shop</template> -->
        <!-- <div 
            class="border border-purple-400 z-40 bg-emerald-200"
        > -->
        <!-- :class="contentWrapperClasses[2]" -->
        <!-- <div> -->
            <!-- class="-mt-2" -->
            <PageTitle>Shop</PageTitle>
        <!-- </div> -->
        <!-- </div> -->

        <div :class="menuAndContentWrapperClasses">
            <div :class="menuWrapperClasses">
                <ShopCategoriesMenu />
            </div>

            <div :class="contentWrapperClasses">
                <div :class="mainContentClasses" style="width: 100%;">
                    <ProductList />
                </div>
            </div>
        </div>

        <PageFooter />
    </Page>
</template>

<style lang="css" scoped></style>