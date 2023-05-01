<script lang="ts" setup>
const titleWrapperClasses = [
    // "border border-blue-400",
    "h-16 md:h-20 flex items-end",
    "mb-5",
]

const titleClasses = [
    "font-serif tracking-wide font-semibold leading-none text-3xl md:text-4xl",
    "ml-4 md:ml-6 lg:ml-8"
]
</script>

<template>
    <div class="page-title" :class="titleWrapperClasses">
        <h1 :class="titleClasses">
            <slot></slot>
        </h1>
    </div>
</template>