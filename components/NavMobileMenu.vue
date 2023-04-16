<script lang="ts" setup>
type Props = {
    isOpen: boolean;
}
defineProps<Props>();

const absClasses = 'absolute top-0 left-0 right-0'

const wrapperClasses = [
    absClasses,
    'bg-white'
]
</script>

<template>
    <div :class="wrapperClasses">

    </div>
</template>