<script lang="ts" setup>

</script>

<template>
    <div class="h-screen" id="defaultBg">
        <slot></slot>
    </div>
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