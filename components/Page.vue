<script lang="ts" setup>
import { useIntersectionStore } from '../store/intersectionStore';

type Props = {
    label?: string;
}
defineProps<Props>();

const store = useIntersectionStore();

// const isIntersecting = store.isIntersecting;
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
    const rootEl = document.getElementById('observerRoot')
    const el = document.getElementById('intersectionObserver')

    const opts = {
        root: rootEl,
        // false if 20% or more of el is hidden under navbar
        threshold: 0.20,
    }
    const observer = new IntersectionObserver(handleObserve, opts);

    if (el) {
        console.log('observing')
        observer.observe(el)
    }
})

// h-40 sm:h-52 md:h-64
const observerClasses = computed(() => ([
    "pt-8 -z-10",
    "relative top-px",
    "border",
    "border-transparent",
    // store.isIntersecting ? "border-blue-500" : "border-red-500"
]))

const rootClasses = [
    ""
    // "border border-green-500",
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
    min-height: calc(100vh - 160px);
}

@media screen and (min-width: 480px) {
    .main-content {
        top: 208px;
        min-height: calc(100vh - 208px);
    }
}

@media screen and (min-width: 640px) {
    .main-content {
        top: 256px;
        min-height: calc(100vh - 256px);
    }
}
</style>