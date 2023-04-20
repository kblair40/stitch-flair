<script lang="ts" setup>
interface Props {
    label: string;
    size: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
    size: 'md'
})

const wrapperClasses = [
    "flex flex-col w-full"
]

// const labelClasses = {
//     'sm': 'mb-1',
//     'md': 'mb-1.5',
//     'lg': 'mb-2',
// }[props.size]

const labelClasses = [
    ['md', 'lg'].includes(props.size) ? 'mb-1.5' : 'mb-1',
]
</script>

<template>
    <div :class="wrapperClasses">
        <p class="font-medium" :class="labelClasses">{{ label }}</p>

        <slot></slot>
    </div>
</template>