<script lang="ts" setup>
interface Props {
    label: string;
    size: 'sm' | 'md' | 'lg',
    required: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    size: 'md',
    required: false
})

const wrapperClasses = "flex flex-col w-full"
const labelClasses = ['md', 'lg'].includes(props.size) ? 'mb-1.5' : 'mb-1'
</script>

<template>
    <div :class="wrapperClasses">
        <div class="border flex space-x-1">
            <p class="font-medium whitespace-nowrap" :class="labelClasses">{{ label }}</p>
            <p v-if="required" class="text-red-400">*</p>
        </div>

        <slot></slot>
    </div>
</template>