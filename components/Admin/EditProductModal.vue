<script lang="ts" setup>
import { useAdminStore } from '~~/store/adminStore';

const store = useAdminStore();

const emit = defineEmits(['close', 'error', 'success'])

const handleError = (msg: string) => {
    console.log('msg in modal:', msg);
    emit('error', msg);
}

const wrapperClasses = [
    // 'border border-red-500',
    'z-40 shadow-lg fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-white',
    'max-w-xl w-4/5 sm:w-5/6 md:w-3/4 lg:w-2/3 transition-opacity rounded-md',
]
const innerWrapperClasses = 'relative h-full w-full pt-8 pb-4 px-3';
const overlayClasses = 'z-40 fixed top-0 bottom-0 left-0 right-0 w-screen h-screen'
const btnClasses = [
    'rounded-full flex justify-center items-center transition-colors',
    'absolute top-2 right-2 h-8 w-8',
    'border border-gray-300 hover:bg-gray-50 active:bg-gray-100'
]
</script>

<template>
    <div v-if="store.showEditProductModal" class="z-50">
        <div :class="overlayClasses" class="bg-slate-300/50" @click="$emit('close')" />
        <div :class="wrapperClasses">
            <div :class="innerWrapperClasses">
                <button @click="$emit('close')" :class="btnClasses">
                    <img src="/icons/close.svg" />
                </button>

                <AdminEditProductForm @success="$emit('success')" @done="$emit('close')" @error="handleError" />
            </div>
        </div>
    </div>
</template>