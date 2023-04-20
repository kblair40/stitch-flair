<script lang="ts" setup>
interface Props {
    label: string;
    size: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
    size: 'md'
})

const wrapperClasses = [
    "flex flex-col"
]
</script>

<template>
    <div :class="wrapperClasses">
        <p>{{ label }}</p>

        <slot></slot>
    </div>
</template>