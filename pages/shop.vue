<script lang="ts" setup>
const menuWrapperClasses = [
    // "border border-purple-700",
    'hidden sm:block',
    'w-48 md:w-64 lg:w-76 lg:pl-2',
]
const mainContentClasses = [
    // 'border border-red-500'
    'px-4 md:px-6 w-full',
]
const menuAndContentWrapperClasses = [
    // "border border-blue-500",
    "flex w-full h-full",
]
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

        <PageFooter />
    </Page>
</template>