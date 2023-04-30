<script lang="ts" setup>
const contentWrapperClasses = [
    "border w-screen",
    "-ml-16 pl-48 sm:pl-48 md:pl-60 lg:pl-76" // change depending on screen size
]
const menuWrapperClasses = [
    'hidden sm:block',
    'absolute top-0 left-0 bottom-0 right-0',
    'lg:pl-12',
    'h-full w-48 md:w-60 lg:w-76', // 304px
    'overflow-y-auto'
]

const mainContentClasses = ['px-0']
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
                    Content
                </div>
            </div>
        </div>
    </Page>
</template>