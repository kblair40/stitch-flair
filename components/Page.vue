<script lang="ts" setup>
import { useIntersectionStore } from '../store/intersectionStore';

type Props = {
    label?: string;
}
defineProps<Props>();

const store = useIntersectionStore();

const isIntersecting = store.isIntersecting;
const handleObserve = (entries: any[]) => {
    entries.forEach(entry => {
        console.log('\nOBSERVE ENTRY:', entry);
        store.setIsIntersecting(entry.isIntersecting);
        // if (!entry.isIntersecting) store.setIsIntersecting(true);
        // else store.setIsIntersecting(false)
    })
}

onMounted(() => {
    const el = document.getElementById('intersectionObserver')
    const opts = { root: null, threshold: 1 }
    const observer = new IntersectionObserver(handleObserve, opts);

    if (el) {
        console.log('observing')
        observer.observe(el)
    }
})

// h-40 sm:h-52 md:h-64
const observerClasses = [
    // "relative",
    // "fixed",
    // "h-40 sm:h-52 md:h-64",
    // "-top-40 sm:-top-52 md:-top-64",
    // "top-1",
    "h-1",
    // "mt-px",
    "border",
    // "w-screen top-0 left-0 right-0",
    // "bg-white",
    "bg-black",
    // "-z-10"
    isIntersecting ? "border-green-500" : "border-red-500"
]
</script>

<template>
    <div class="min-h-screen flex flex-column">
        <div :class="observerClasses" id="intersectionObserver">

            <div class="main-content min-h-screen flex flex-col justify-between">
                <div class="border border-red-300">
                    <slot></slot>
                </div>

                <p class="pt-10 mb-1.5 text-center text-sm">
                    &#169; Stitch Flair {{ new Date().getFullYear() }}
                </p>
            </div>
            
        </div>

    </div>
</template>

<style lang="css" scoped>
.main-content {
    /* border: 1px solid red; */
    overflow-y: auto;
    position: absolute;
    top: 160px;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    /* padding-bottom: 1rem; */
    min-height: calc(100vh - 160px);
}

@media screen and (min-width: 480px) {
    .main-content {
        /* height: calc(100vh - 304px); */
        top: 208px;
        min-height: calc(100vh - 208px);
    }
}

@media screen and (min-width: 640px) {
    .main-content {
        /* height: calc(100vh - 368px); */
        top: 256px;
        min-height: calc(100vh - 256px);
    }
}
</style>