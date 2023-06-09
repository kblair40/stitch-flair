<script lang="ts" setup>
interface Props {
    icon: 'edit' | 'close' | 'save' | 'trash';
    size: 'xs' | 'sm' | 'md' | 'lg';
    disabled?: boolean;
    loading?: boolean;
    extraClasses?: string;
}
const props = withDefaults(defineProps<Props>(), {
    icon: 'close',
    size: 'md',
    disabled: false,
    loading: false,
})
defineEmits(['click'])

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
        "disabled:pointer-events-none disabled:opacity-50",
        sizeClasses[props.size],
        colors,
        props.extraClasses ? props.extraClasses : '',
    ].join(' ')
})

const iconClasses = computed(() => {
    if (['xs', 'sm'].includes(props.size)) {
        return props.icon !== 'trash' ? 'scale-75' : 'scale-65'
    }
    if (['md', 'lg'].includes(props.size)) {
        return props.icon !== 'trash' ? 'scale-90' : 'scale-75'
    }
    return  '';
})
</script>

<template>
    <button :disabled="disabled" type="button" :class="classes" @click="$emit('click')">
        <img v-if="!loading" :class="iconClasses" :src="`/icons/${icon}.svg`" />
        <img v-else class="animate-spin h-5 w-5 z-40 fill-red-400" src="/icons/loading.svg" />
    </button>
</template>