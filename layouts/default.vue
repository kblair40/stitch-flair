<script lang="ts">

</script>

<template>
    <div id="defaultBg" class="h-screen w-screen fixed bg-no-repeat bg-center bg-cover" />
    <!-- base: 152px, sm: 210px, md: 258px -->
    <Nav />

    <div class="pt-38 sm:pt-52.5 md:pt-64.5 relative">
        <div class="pt-8 px-8 lg:px-20">
            <!-- <p v-for="i in 100" :key="i">Some default layout shared across all pages</p> -->
            <slot />
        </div>
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

.myclass {
    background: black !important;
}
</style>