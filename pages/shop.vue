<script lang="ts" setup>
const contentWrapperClasses = [
    "border w-screen",
    "-ml-16 pl-60" // change depending on screen size
]

const mainContentClasses = ['px-8']
</script>

<template>
    <Page>
        <template #header>Shop</template>

        <div class="flex w-full h-full">
            <div class="categories-menu hidden sm:block">
                <ShopCategoriesMenu />
            </div>

            <div class="main-content" :class="contentWrapperClasses">
                <div :class="mainContentClasses">
                    Content
                </div>
            </div>
        </div>
    </Page>
</template>

<style lang="css" scoped>
.categories-menu {
    /* border: 1px solid red; */
    height: 100%;
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
    /* padding-left: 240px; */
}
</style>