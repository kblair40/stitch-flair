<script lang="ts" setup>
// MD
// header/nav = 256px height
// +64px (32px above, 32px below) header (h1)
// +40px header itself
// = 360px
const headerWrapperClasses = [
    // "border border-red-400",
    "h-24 md:h-28 flex items-center",
    "fixed top-40 sm:top-52 md:top-64"
]

const headerClasses = [
    "font-serif tracking-wide font-semibold leading-none text-3xl md:text-4xl",
    "ml-4 md:ml-6 lg:ml-8"
]
</script>

<template>
    <div :class="headerWrapperClasses">
        <h1 :class="headerClasses">
            <slot></slot>
        </h1>
    </div>
</template>