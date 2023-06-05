<script lang="ts" setup>
interface Props {
    visible: boolean;
}
const props = defineProps<Props>();
const emit = defineEmits(['close']);

const visibleClasses = ['-translate-y-full']
const notVisibleClasses = ['-translate-y-0']
const wrapperClasses = [
    'pb-4 fixed top-vh left-1/2 -translate-x-1/2',
    'transition-transform ease-in-out duration-300',
    `${props.visible ? visibleClasses : notVisibleClasses}`
]
const textWrapperClasses = [
    // 'border border-emerald-500',
    'bg-white h-full py-4 px-8 rounded-md shadow-lg bg-emerald-200/50',
    'flex justify-center items-center'
]
</script>

<template>
    <div :class="wrapperClasses">
        <div :class="textWrapperClasses">
            <p class="font-medium text-lg capitalize">
                <slot></slot>
            </p>
        </div>
    </div>
</template>