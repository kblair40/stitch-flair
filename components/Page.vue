<script lang="ts" setup>
import { useIntersectionStore } from '../store/intersectionStore';

defineProps<{ label?: string; }>();

const store = useIntersectionStore();

const rootEl = ref<HTMLElement | null>(null);

const handleObserve = (entries: any[]) => {
    entries.forEach(entry => {
        console.log('SETTING INTERSECTING TO', entry.isIntersecting);
        store.setIsIntersecting(entry.isIntersecting);
    })
}

onBeforeMount(() => {
    store.isIntersecting = true;
    store.disableChange();
})

const handleScroll = (e: any) => {
    console.log('Scroll Event:', e);
    store.enableChange();
    removeListener()
}

const removeListener = () => {
    if (rootEl.value) {
        rootEl.value.removeEventListener('scroll', handleScroll)
        console.warn('LISTENER REMOVED')
    }
}

onMounted(() => {
    rootEl.value = document.getElementById('observerRoot')
    const el = document.getElementById('intersectionObserver')

    // isIntersection will be false if ANY part of el is hidden under navbar
    const opts = {
        root: rootEl.value,
        threshold: 1
    }
    const observer = new IntersectionObserver(handleObserve, opts);

    if (el) {
        console.log('observing')
        observer.observe(el)
    }

    if (rootEl.value) {
        console.log('Adding event listener')
        rootEl.value.addEventListener('scroll', handleScroll);
    }
})

// h-40 sm:h-52 md:h-64
const observerClasses = computed(() => ([
    "-z-10 h-4 relative top-2",
    "border border-transparent",
]))
</script>

<template>
    <div class="min-h-screen flex flex-column">

        <div class="h-4 w-4 absolute left-4 top-4">
            <div :class="store.isIntersecting ? 'bg-green-500' : 'bg-red-500'" class="w-full h-full" />
        </div>

        <div id="observerRoot" class="main-content min-h-screen flex flex-col">
            <div :class="observerClasses" id="intersectionObserver" class="observer" />

            <div class="grow">
                <slot></slot>
            </div>

            <p class="pt-10 mb-1.5 text-center text-sm">
                &#169; Stitch Flair {{ new Date().getFullYear() }}
            </p>

        </div>

    </div>
</template>

<style lang="css" scoped>
.observer {
    min-height: 32px;
}

.main-content {
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