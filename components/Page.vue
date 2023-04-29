<script lang="ts" setup>
const headerClasses = [
    "font-serif tracking-wide font-semibold leading-none text-3xl md:text-4xl",
    "mb-8"
]
</script>

<template>
    <h1 :class="headerClasses">
        <slot name="header"></slot>
    </h1>

    <slot></slot>
</template>