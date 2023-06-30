<script lang="ts" setup>
interface Props {
    icon: 'edit' | 'close' | 'save' | 'trash';
    size: 'sm' | 'md' | 'lg';
}
const props = withDefaults(defineProps<Props>(), {
    icon: 'close',
    size: 'md',
})
defineEmits(['click'])

const icons = {
    close: '/icons/close.svg',
    edit: '/icons/edit.svg',
    save: '/icons/save.svg',
    trash: '/icons/trash.svg'
}

const sizeClasses = {
    xs: 'h-5 w-5 min-w-5',
    sm: 'h-7 w-7 min-w-7',
    md: 'h-8 w-8 min-w-8',
    lg: 'h-10 w-10 min-w-10'
}

const colorClasses = {
    default: 'hover:bg-gray-50 active:bg-gray-100',
    error: 'hover:bg-red-50 active:bg-red-100',
}

const classes = computed(() => {
    let colors = ['edit', 'close', 'save'].includes(props.icon)
        ? colorClasses.default
        : colorClasses.error

    return [
        "border transition-colors rounded-full bg-white",
        "rounded-full flex items-center justify-center",
        sizeClasses[props.size], 
        colors
    ].join(' ')
})
</script>

<template>
    <button type="button" :class="classes" @click="$emit('click')">
        <img :src="`/icons/${icon}.svg`" />
    </button>
</template>