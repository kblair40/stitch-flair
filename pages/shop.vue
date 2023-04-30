<script lang="ts" setup>
const menuWrapperClasses = [
    'hidden sm:block',
    'absolute top-0 left-0 bottom-0 right-0',
    'lg:pl-2',
    'h-full w-48 md:w-60 lg:w-76',
    'overflow-y-auto'
]
const contentWrapperClasses = [
    "overflow-y-auto",
    "w-screen h-full",
    "sm:pl-48 md:pl-60 lg:pl-76",
    "bottom-0",
    // "-ml-8 sm:-ml-0 sm:pl-48 md:pl-60 lg:pl-76",
    // "border border-red-500"
]
const mainContentClasses = [
    'px-4 md:px-6',
    // 'border border-red-500'
]
</script>

<template>
    <Page>
        <template #header>Shop</template>

        <div class="flex w-full h-full">
            <div :class="menuWrapperClasses">
                <ShopCategoriesMenu />
            </div>

            <div :class="contentWrapperClasses">
                <div :class="mainContentClasses">
                    <ProductList />
                </div>
            </div>
        </div>
    </Page>
</template>