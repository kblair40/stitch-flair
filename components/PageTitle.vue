<script lang="ts" setup>
interface Props { margin?: string; }

const props = withDefaults(defineProps<Props>(), {
    margin: "ml-4 md:ml-6 lg:ml-8"
})

const titleClasses = [
    "font-serif tracking-wide font-semibold leading-none text-3xl md:text-4xl",
    props.margin,
]
</script>

<template>
    <div class="page-title h-min flex items-end mb-5">
        <h1 :class="titleClasses">
            <slot></slot>
        </h1>
    </div>
</template>