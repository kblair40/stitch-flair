<script lang="ts" setup>

// const navBorder = "border border-blue-500"
const navBorder = ""

const logoClasses = [
    "w-36 h-36",
    "sm:w-48 sm:h-48",
    "md:w-60 md:h-60",
]
</script>

<template>
    <div :class="navBorder" class="fixed top-0 left-0 pl-8 pr-16 pt-4 flex justify-between items-start w-screen">
        <img :class="logoClasses" src="/logo2.svg" />

        <div class="hidden md:flex items-center space-x-8 pt-4">
            <p>Home</p>
            <p>Contact</p>
        </div>

        <NavHamburger />
    </div>
</template>