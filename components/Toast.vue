<script lang="ts" setup>
interface Props {
    visible: boolean;
    error?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
    error: false,
})

const wrapperClasses = computed(() => ([
    'w-max h-full py-4 px-8 rounded-md shadow-lg flex justify-center items-center',
    'text-white max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-2xl',
    props.error ? 'bg-red-500' : 'bg-green-500'
]))
</script>

<template>
    <div :class="props.visible ? '-translate-y-full' : '-translate-y-0'"
        class="pb-4 fixed top-vh left-1/2 -translate-x-1/2 transition-transform ease-in-out duration-300">
        <div :class="wrapperClasses">
            <p class="font-medium capitalize leading-tight">
                <slot></slot>
            </p>
        </div>
    </div>
</template>