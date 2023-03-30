<template>
    <div id="defaultBg" class="h-screen w-screen fixed bg-no-repeat bg-center bg-cover" />
    <div class="fixed top-0 left-0 pl-8 pr-16 pt-8 flex justify-between items-start w-screen">
        <img src="/logo.svg" class="w-32 h-32" />

        <div class="flex items-center space-x-8">
            <p>Home</p>
            <p>About</p>
        </div>
    </div>

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
    opacity: .4;
}
</style>