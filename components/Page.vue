<script lang="ts" setup>
// MD
// header/nav = 256px height
// +64px (32px above, 32px below) header (h1)
// +40px header itself
// = 360px
const headerWrapperClasses = [
    "h-28 flex items-center"
]
const headerClasses = [
    "font-serif tracking-wide font-semibold leading-none text-3xl md:text-4xl",
]
const mainContentClasses = [
    'pl-8 sm:pl-16'
]
const pageBodyClasses = [
    'px-16'
]
</script>

<template>
    <div :class="pageBodyClasses" class="page-body">

        <div class="header-wrapper" :class="headerWrapperClasses">

            <h1 :class="headerClasses">
                <slot name="header"></slot>
            </h1>
        </div>

        <div class="main-content" :class="mainContentClasses">
            <slot></slot>
        </div>
    </div>
</template>

<style lang="css" scoped>
.header-wrapper {
    position: fixed;
    top: 256px;
    width: 100%;
}
.main-content {
    height: calc(100vh - 368px);
    /* overflow-y: auto; */
    position: fixed;
    /* 360px for md */
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
}
</style>