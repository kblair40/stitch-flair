<script lang="ts" setup>
const contentWrapperClasses = [
    "border w-screen",
    "-ml-16 pl-56 md:pl-64 lg:pl-68" // change depending on screen size
]
const menuWrapperClasses = [
    'hidden sm:block',
    'absolute top-0 left-0 bottom-0 right-0',
    'md:pl-8 lg:pl-12',
    'h-full w-64 sm:w-68 md:w-72 lg:w-76', // 294px
    'overflow-y-auto'
]

const mainContentClasses = ['px-8']
</script>

<template>
    <Page>
        <template #header>Shop</template>

        <div class="flex w-full h-full">
            <div :class="menuWrapperClasses" class="hidden sm:block">
                <ShopCategoriesMenu />
            </div>

            <div :class="contentWrapperClasses">
                <div :class="mainContentClasses">
                    Content
                </div>
            </div>
        </div>
    </Page>
</template>