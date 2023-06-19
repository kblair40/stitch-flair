<script lang="ts" setup>
interface Props {
    visible: boolean;
    error?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
    error: false,
})

const visibleClasses = ['-translate-y-full']
const notVisibleClasses = ['-translate-y-0']
const wrapperClasses = computed(() => {
    return [
        'pb-4 fixed top-vh left-1/2 -translate-x-1/2',
        'transition-transform ease-in-out duration-300',
        `${props.visible ? visibleClasses : notVisibleClasses}`
    ]
})
const textWrapperClasses = computed(() => ([
    // 'border border-emerald-500',
    'h-full py-4 px-8 rounded-md shadow-lg',
    'flex justify-center items-center',
    props.error ? 'bg-red-200/50' : 'bg-green-200/50',
]))
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