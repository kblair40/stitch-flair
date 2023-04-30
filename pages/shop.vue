<script lang="ts" setup>
const contentWrapperClasses = [
    "overflow-y-auto",
    "w-screen h-full",
    "-ml-8 sm:-ml-16 sm:pl-48 md:pl-60 lg:pl-76",
]
const menuWrapperClasses = [
    'hidden sm:block',
    'absolute top-0 left-0 bottom-0 right-0',
    'lg:pl-12',
    'h-full w-48 md:w-60 lg:w-76',
    'overflow-y-auto'
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
                    <p v-for="i in 40">Content</p>
                </div>
            </div>
        </div>
    </Page>
</template>