<script lang="ts" setup>

// const navBorder = "border border-blue-500"
const navBorder = ""

const logoClasses = [
    "w-36 h-36",
    "sm:w-48 sm:h-48",
    "md:w-60 md:h-60",
]
const linkClasses = [
    'text-slate-600 border-b-2 border-transparent transition-colors duration-300',
    'hover:border-slate-500 hover:text-slate-800'
].join(' ')
const activeLinkClasses = [
    '!border-slate-600 text-slate-800 font-medium'
].join(' ')
const iconClasses = [
    'w-5 h-5'
]
</script>

<template>
    <div :class="navBorder"
        class="z-10 fixed top-0 left-0 pl-8 pr-16 pt-4 md:pl-16 md:pr-24 lg:pl-24 lg:pr-32 flex justify-between items-start w-screen">
        <img :class="logoClasses" src="/logo2.svg" />

        <div class="h-32 sm:h-42 md:h-48 flex flex-col justify-between">
            <div class="hidden md:flex space-x-6 justify-end">
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

            <div class="hidden md:flex items-center space-x-8 pt-4">
                <NuxtLink :class="linkClasses" :activeClass="activeLinkClasses" to="/">Home</NuxtLink>
                <NuxtLink :class="linkClasses" :activeClass="activeLinkClasses" to="/shop">Shop</NuxtLink>
                <NuxtLink :class="linkClasses" :activeClass="activeLinkClasses" to="/contact">Contact</NuxtLink>
            </div>

            <NavHamburger />
        </div>


    </div>
</template>