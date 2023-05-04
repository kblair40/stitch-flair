<!-- <script lang="ts" setup></script> -->

<template>
    <div id="defaultBg" class="h-screen w-screen fixed bg-no-repeat bg-center bg-cover" />
    <!-- base: 152px, sm: 210px, md: 258px -->
    <Nav />

    <slot></slot>
</template>

<style lang="css">
html {
    font-family: Poppins;
}

#defaultBg {
    z-index: -1;
    background-image: url("/rose_pink_bg.svg");
    opacity: 1;
}
</style>