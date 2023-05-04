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
        console.log('SETTING INTERSECTING TO', entry.isIntersecting);
        store.setIsIntersecting(entry.isIntersecting);
        // if (!entry.isIntersecting) store.setIsIntersecting(true);
        // else store.setIsIntersecting(false)
    })
}

onMounted(() => {
    const observerRootEl = document.getElementById('observerRoot')
    if (observerRootEl) {
        observerRootEl.style.backgroundColor = '#fff'

        const observerDims = observerRootEl.getBoundingClientRect();
        console.log('\n\nobserverDims:', observerDims);
    }

    const el = document.getElementById('intersectionObserver')
    if (el) {
        el.style.backgroundColor = '#fff'

        const elDims = el.getBoundingClientRect();
        console.log('\n\nelDims:', elDims);
    }

    const opts = {
        // root: null, 
        // root: document.getElementById('observerRoot'),
        root: observerRootEl,
        // threshold: .99
        threshold: 0,
    }
    const observer = new IntersectionObserver(handleObserve, opts);

    if (el) {
        console.log('observing')
        observer.observe(el)
    }
})

// h-40 sm:h-52 md:h-64
const observerClasses = [
    "relative top-px",
    // "fixed",
    // "h-40 sm:h-52 md:h-64",
    // "-top-40 sm:-top-52 md:-top-64",
    // "top-1",
    // "h-px",
    // "mt-px",
    // "w-screen top-0 left-0 right-0",
    // "bg-white",
    // "bg-slate-200",
    // "-z-10"
    "border-2",
    isIntersecting ? "border-blue-500" : "border-red-500"
]

const rootClasses = [
    "border border-green-500",
    // isIntersecting ? "border-green-500" : "border-red-500"
]
</script>

<template>
    <div class="min-h-screen flex flex-column">

        <div :class="rootClasses" id="observerRoot" class="main-content min-h-screen flex flex-col justify-between">
            <div :class="observerClasses" id="intersectionObserver" />
            <slot></slot>
            <!-- <div :class="observerClasses" id="intersectionObserver">
                <div>
                    <slot></slot>
                </div>
            </div> -->

            <p class="pt-10 mb-1.5 text-center text-sm">
                &#169; Stitch Flair {{ new Date().getFullYear() }}
            </p>

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
    /* border: 1px solid green; */
    /* height setting is new */
    /* height: 100%; */
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