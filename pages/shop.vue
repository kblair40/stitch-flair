<script lang="ts" setup>
const menuWrapperClasses = [
    'hidden sm:block',
    'h-full w-48 md:w-60 lg:w-68 lg:pl-2 xl:w-76',
]
const mainContentClasses = [
    'px-4 xl:px-6 w-full h-full',
]
const menuAndContentWrapperClasses = "flex w-full h-full"
</script>

<template>
    <Page>
        <PageTitle>Shop</PageTitle>

        <div :class="menuAndContentWrapperClasses">
            <div :class="menuWrapperClasses">
                <ShopCategoriesMenu />
            </div>

            <div :class="mainContentClasses" style="width: 100%;">
                <ProductList />
            </div>
        </div>
    </Page>
</template>