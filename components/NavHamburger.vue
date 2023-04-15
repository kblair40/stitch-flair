<script lang="ts" setup>
const wrapperClasses = [
    // 'border border-red-500',
    'w-12 h-10',
    'absolute top-6 right-6',
    'md:hidden',
    'flex flex-col items-center justify-evenly',
    'cursor-pointer'
]
const lineClasses = [
    'h-px w-full bg-slate-900'
]
</script>

<template>
    <div :class="wrapperClasses">
        <span :class="lineClasses" />
        <span :class="lineClasses" />
        <span :class="lineClasses" />
    </div>
</template>