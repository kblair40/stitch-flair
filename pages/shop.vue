<script lang="ts" setup>
const mainContentClasses = [
    "border w-full"
]
</script>

<template>
    <Page>
        <template #header>Shop</template>

        <div class="flex">
            <div class="categories-menu">
                <ShopCategoriesMenu />
            </div>

            <div class="main-content" :class="mainContentClasses">
                Content
            </div>
        </div>
    </Page>
</template>

<style lang="css" scoped>
.categories-menu {
    height: 100%;
    /* border: 1px solid red; */
    overflow-y: auto;
    width: 240px;

    position: absolute;
    height: 100%;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
}

.main-content {
    padding-left: 240px;
}
</style>