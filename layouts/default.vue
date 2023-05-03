<script lang="ts" setup>
import { useIntersectionStore } from '../store/intersectionStore';

const store = useIntersectionStore();

</script>

<template>
    <div id="defaultBg" class="h-screen w-screen fixed bg-no-repeat bg-center bg-cover" />
    <!-- base: 152px, sm: 210px, md: 258px -->
    <Nav :isIntersecting="store.isIntersecting" />

    
        <slot></slot>

    <!-- <div ref="target" class="pt-38 sm:pt-52.5 md:pt-64.5 border border-red-500">
        <div id="intersectionObserver" class="absolute top-2 h-px left-0 right-0 w-screen" />
        <slot></slot>
    </div> -->
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