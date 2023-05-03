<script lang="ts" setup>
const isIntersecting = ref(false);
const handleObserve = (entries: any[]) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) isIntersecting.value = true
        else isIntersecting.value = false
    })
}


onMounted(() => {
    const el = document.getElementById('intersectionDetect')
    const opts = { root: null, threshold: .5 }
    const observer = new IntersectionObserver(handleObserve, opts);

    if (el) {
        console.log('observing')
        observer.observe(el)
    }
})
// h-40 sm:h-52 md:h-64
</script>

<template>
    <div id="defaultBg" class="h-screen w-screen fixed bg-no-repeat bg-center bg-cover" />
    <!-- base: 152px, sm: 210px, md: 258px -->
    <!-- <Nav :isIntersecting="false" /> -->
    <Nav :isIntersecting="isIntersecting" />
    <div class="relative top-40 sm:top-52 md:top-64" id="intersectionDetect" />

    <slot></slot>

    <!-- <div ref="target" class="pt-38 sm:pt-52.5 md:pt-64.5 border border-red-500">
        <div id="intersectionDetect" class="absolute top-2 h-px left-0 right-0 w-screen" />
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

#intersectionDetect {
    z-index: 1000;
    background-color: #ccc;
    height: 1px;
    width: 100%;
}
</style>