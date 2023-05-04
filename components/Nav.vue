<script lang="ts" setup>
import { useIntersectionStore } from '../store/intersectionStore';

const store = useIntersectionStore();

interface Props {
    isIntersecting?: boolean;
}
const props = defineProps<Props>();

const logoClasses = [
    "w-36 h-36",
    "sm:w-48 sm:h-48",
    "md:w-60 md:h-60",
]
const linkClasses = [
    'text-slate-600 border-b-2 border-transparent transition-colors duration-300',
    'hover:border-slate-500 hover:text-slate-800'
].join(' ')
const activeLinkClasses = '!border-slate-600 text-slate-800 font-medium'
const iconClasses = 'w-5 h-5'
const allLinksWrapperClasses = [
    // "border border-blue-400",
    "flex flex-col md:justify-between justify-end items-end",
    "pt-4 h-36 sm:h-42 md:h-48 w-full",
    'z-20'
]
const socialClasses = [
    "absolute right-6 top-30 sm:top-38 flex space-x-6 md:static",
]

const showMobileNav = ref(false);

const handleToggleNav = () => {
    showMobileNav.value = !showMobileNav.value;
}

const wrapperClasses = computed(() => ([
    // "border border-blue-500",
    "overflow-hidden z-10",
    "fixed top-0 left-0",
    "pl-8 pr-16 pt-4 md:pl-16 md:pr-24 lg:pl-24 lg:pr-32",
    "w-screen",
    "flex justify-between items-start",
    "transition-shadow duration-300",
    !store.isIntersecting ? 'shadow-md' : '',
    'h-40 sm:h-52 md:h-64',
    'border-b',
    'border-slate-100'
]))
</script>

<template>
    <div :class="wrapperClasses">
        <img :class="logoClasses" src="/logo2.svg" />

        <!-- <img src="/rose_pink_bg.svg" class="z-10 absolute top-0 right-0 bottom-0 left-0" /> -->
        <div class="z-10 absolute top-0 right-0 bottom-0 left-0 -z-10" />

        <div :class="allLinksWrapperClasses">
            <div :class="socialClasses">
                <NuxtLink to="https://www.etsy.com" target="_blank">
                    <img :class="iconClasses" src="/icons/etsy.svg" />
                </NuxtLink>

                <NuxtLink to="https://www.facebook.com" target="_blank">
                    <img :class="iconClasses" src="/icons/fb.svg" />
                </NuxtLink>

                <NuxtLink to="https://www.instagram.com" target="_blank">
                    <img :class="iconClasses" src="/icons/ig.svg" />
                </NuxtLink>
            </div>

            <div class="hidden md:flex items-center self-end space-x-8 pt-4">
                <NuxtLink :class="linkClasses" :activeClass="activeLinkClasses" to="/">Home</NuxtLink>
                <NuxtLink :class="linkClasses" :activeClass="activeLinkClasses" to="/shop">Shop</NuxtLink>
                <NuxtLink :class="linkClasses" :activeClass="activeLinkClasses" to="/contact">Contact</NuxtLink>
            </div>

            <NavHamburger @toggleNav="handleToggleNav" />
            <NavMobileMenu :isOpen="showMobileNav" @toggleNav="handleToggleNav" />
        </div>

    </div>
</template>