<script lang="ts">

</script>

<template>
    <div id="defaultBg" class="h-screen w-screen fixed bg-no-repeat bg-center bg-cover" />
    <Nav />

    <div>
        <!-- <p v-for="i in 100" :key="i">Some default layout shared across all pages</p> -->
        <slot />
    </div>
</template>

<style lang="css">
html {
    font-family: Poppins;
}

#defaultBg {
    background-image: url("/rose_pink_bg.svg");
    opacity: .6;
}
</style>