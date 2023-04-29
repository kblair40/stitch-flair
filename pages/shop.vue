<script lang="ts" setup>
const menuWrapperClasses = [
    "w-60 h-full overflow-auto"
]
const mainContentClasses = [
    "border ml-8 w-full"
]
</script>

<template>
    <Page>
        <template #header>Shop</template>

        <div class="flex">
            <div class="categories-menu" :class="menuWrapperClasses">
                <ShopCategoriesMenu />
            </div>

            <div :class="mainContentClasses">
                Content
            </div>
        </div>
    </Page>
</template>

<style lang="css" scoped>
.categories-menu {
    /* position: absolute;
    border: 1px solid black;
    height: 100%;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0; */
}
</style>