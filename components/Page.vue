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
    <div class="min-h-screen flex flex-column">
        <div class="header-wrapper" :class="headerWrapperClasses">
            <h1 :class="headerClasses">
                <slot name="header"></slot>
            </h1>
        </div>

        <div class="main-content">
            <slot></slot>

            <p class="pt-16 absolute bottom-1 left-0 right-0 text-center text-sm">
                &#169; Stitch Flair {{ new Date().getFullYear() }}
            </p>
        </div>

    </div>
</template>

<style lang="css" scoped>
.main-content {
    border: 1px solid red;
    overflow-y: auto;
    position: absolute;
    top: 256px;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    padding-bottom: 1rem;
    min-height: calc(100vh - 256px);
}

@media screen and (min-width: 480px) {
    .main-content {
        /* height: calc(100vh - 304px); */
        top: 304px;
        min-height: calc(100vh - 304px);
    }
}

@media screen and (min-width: 640px) {
    .main-content {
        /* height: calc(100vh - 368px); */
        top: 368px;
        min-height: calc(100vh - 368px);
    }
}
</style>