<template>
    <div id="defaultBg" class="h-screen w-screen fixed bg-no-repeat bg-center bg-cover" />
    <div>
        <!-- <p v-for="i in 100" :key="i">Some default layout shared across all pages</p> -->
        <slot />
    </div>
</template>

<style scoped lang="css">
#defaultBg {
    background-image: url("/rose_pink_bg.svg");
}
</style>