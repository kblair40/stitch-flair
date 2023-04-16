<script lang="ts" setup>
type Props = {
    isOpen: boolean;
}
defineEmits(['toggleNav'])
const props = defineProps<Props>();

const overlayClasses = [
    'border border-blue-500',
    'fixed top-0 right-0 bottom-0 left-0 h-screen w-screen',
    'bg-slate-400/25',
    'z-10'
]

const wrapperClasses = computed(() => {
    return [
        'absolute top-0 left-0 right-0',
        'py-7 space-y-4',
        'z-20',
        'bg-white shadow-sm',
        'transition-transform duration-300',
        'border border-red-500',
        !props.isOpen ? '-translate-y-full' : '',
    ]
})

// const wrapperClasses = reactive([
//     // 'absolute top-0 left-0 right-0',
//     'absolute left-0 right-0',
//     'pt-12 pb-6 space-y-4',
//     'z-20',
//     'bg-white shadow-sm',
//     'transition-transform duration-300',
//     props.isOpen ? 'top-0' : '-top-full'
//     // !props.isOpen ? 'translate-y-0' : '-translate-y-full',
// ])
</script>

<template>
    <div :class="wrapperClasses">
        <p class="text-center">content</p>
        <p class="text-center">content</p>
        <p class="text-center">content</p>
    </div>
    <div @click="$emit('toggleNav')" v-if="isOpen" :class="overlayClasses"></div>
</template>