<script lang="ts" setup>
// MD
// header/nav = 256px height
// +64px (32px above, 32px below) header (h1)
// +40px header itself
// = 360px

// 'h-40 sm:h-52 md:h-64'
const headerWrapperClasses = [
    // "border border-red-400",
    "h-24 md:h-28 flex items-center",
    "fixed top-40 sm:top-52 md:top-64"
]
const headerClasses = [
    "font-serif tracking-wide font-semibold leading-none text-3xl md:text-4xl",
    "ml-4 md:ml-6 lg:ml-8"
]
</script>

<template>
    <div>
        <div class="header-wrapper" :class="headerWrapperClasses">
            <h1 :class="headerClasses">
                <slot name="header"></slot>
            </h1>
        </div>

        <!-- <div> -->
            <div class="main-content">
                <slot></slot>
            </div>
        <!-- </div> -->
    </div>
</template>

<style lang="css" scoped>
.header-wrapper {
    position: fixed;
    /* top: 256px; */
    /* width: 100%; */
}

.main-content {
    /* border: 1px solid red; */
    height: calc(100vh - 256px);
    overflow-y: auto;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
}

@media screen and (min-width: 480px) {
    .main-content {
        height: calc(100vh - 304px);
    }
}

@media screen and (min-width: 640px) {
    .main-content {
        height: calc(100vh - 368px);
    }
}
</style>