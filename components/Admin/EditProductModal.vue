<script lang="ts" setup>
import { useAdminStore } from '~~/store/adminStore';

const store = useAdminStore();

const emit = defineEmits(['save', 'close'])

const handleClose = () => emit('close')

const wrapperClasses = [
    // 'border border-red-500',
    'z-50 shadow-lg fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-white',
    'py-4 px-3 max-w-xl w-4/5 sm:w-5/6 md:w-3/4 lg:w-2/3 transition-opacity rounded-md',
    // 'border border-slate-400'
]
const overlayClasses = [
    // 'border border-blue-600',
    'z-50 fixed top-0 bottom-0 left-0 right-0 w-screen h-screen',
    'bg-slate-300/50'
]
</script>

<template>
    <div v-if="store.showEditProductModal" class="z-50">
        <div :class="overlayClasses" @click="handleClose" />
        <div :class="wrapperClasses">
            <AdminEditProductForm @done="handleClose" />
        </div>
    </div>
</template>