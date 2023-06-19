<script lang="ts" setup>
interface Props {
    visible: boolean;
    error?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
    error: false,
})
</script>

<template>
    <div :class="props.visible ? '-translate-y-full' : '-translate-y-0'"
        class="pb-4 fixed top-vh left-1/2 -translate-x-1/2 transition-transform ease-in-out duration-300">
        <div :class="props.error ? 'bg-red-600/75 text-white' : 'bg-green-600/75 text-white'"
            class="h-full py-4 px-8 rounded-md shadow-lg flex justify-center items-center text-white">
            <p class="font-medium text-lg capitalize">
                <slot></slot>
            </p>
        </div>
    </div>
</template>