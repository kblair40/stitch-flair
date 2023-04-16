<script lang="ts" setup>
const navBgClass = ref('bg-transparent')
const isIntersecting = ref(false);
const handleObserve = (entries: any[]) => {
    console.log('observe')
    entries.forEach(entry => {

        console.log('entry:', entry);
        if (!entry.isIntersecting) isIntersecting.value = true
        else isIntersecting.value = false
        // if (!entry.isIntersecting) navBgClass.value = "bg-white"
        // else navBgClass.value = "bg-transparent"
    })
    // for (let entry of entries) {}
}

// const navClasses = computed(() => {
//     return [
//         "transition-opacity duration-200",
//         "custom-bg",
//         // props.isIntersecting ? "bg-white shadow-sm" : "",
//         isIntersecting.value ? "show-bg" : "hide-bg",
//     ].join(' ')
// })

// watch(navClasses, () => {
//     console.log('classes:', navClasses.value)
// })


onMounted(() => {
    const el = document.getElementById('intersectionDetect')
    // const el = document.getElementById('navWrapper')
    const observer = new IntersectionObserver(
        handleObserve,
        {
            root: null,
            // root: document.getElementById('intersectionDetect'),
            // root: document.getElementById('navWrapper'),
            threshold: .5,
            // rootMargin: '16px',
        }
    );

    if (el) {
        console.log('observing')
        observer.observe(el)
    }
})
</script>

<template>
    <div id="defaultBg" class="h-screen w-screen fixed bg-no-repeat bg-center bg-cover" />
    <!-- base: 152px, sm: 210px, md: 258px -->
    <!-- <div class="" :class="isIntersecting ? 'shadow-xl' : ''" id="navWrapper"> -->
    <Nav :isIntersecting="isIntersecting" />
    <!-- </div> -->

    <div ref="target" class="pt-38 sm:pt-52.5 md:pt-64.5 relative -z-10">
        <div id="intersectionDetect" class="absolute top-2 h-px left-0 right-0 w-screen" />
        <!-- <div id="intersectionDetect" class="top-38 sm:top-52.5 md:top-64.5 relative border border-blue-500"> -->
        <!-- <div id="intersectionDetect" class="w-screen h-px bg-emerald-500 absolute left-0 right-0 top-1" /> -->

        <div class="pt-8 px-8 lg:px-20">
            <slot />
        </div>
    </div>
</template>

<style lang="css">
html {
    font-family: Poppins;
}

/* .custom-bg {
    background-image: url("/rose_pink_bg.svg");
    height: 100%;
    border: 1px solid blue;
} */

/* .show-bg {
    opacity: .7;
}

.hide-bg {
    opacity: 0.2;
} */

#defaultBg {
    z-index: -1;
    background-image: url("/rose_pink_bg.svg");
    opacity: .7;
}

/* #navWrapper {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 152px,
}

@media screen and (min-width: 480px) {
    #navWrapper {
        height: 210px;
    }
}

@media screen and (min-width: 640px) {
    #navWrapper {
        height: 252px;
    }
} */
</style>