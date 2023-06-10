<script lang="ts" setup>
import { useAdminStore } from '~~/store/adminStore';

const store = useAdminStore();


const handleConfirm = () => {
    store.deleteProduct();
}
const handleCancel = () => {
    store.closeConfirmModal();
}

const wrapperClasses = computed(() => {
    return [
        // 'border border-red-500',
        'z-50 shadow-lg fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-white',
        'py-4 px-3 max-w-lg w-4/5 sm:w-5/6 md:w-1/2 transition-opacity',
    ]

})
const btnClasses = [
    'border border-slate-300 px-3 py-1 rounded-md'
]
const overlayClasses = [
    // 'border border-blue-600',
    'z-50 fixed top-0 bottom-0 left-0 right-0 w-screen h-screen',
    'bg-slate-300/50'
]
</script>

<template>
    <div v-if="store.showConfirmModal" class="z-50">
        <div :class="overlayClasses" @click="handleCancel" />
        <div :class="wrapperClasses">
            <h3 class="text-lg font-medium mb-5 z-50">Please confirm you want to delete this product</h3>

            <div class="flex space-x-4 w-full justify-end z-50">
                <button @click="handleCancel" :class="btnClasses">Cancel</button>
                <button @click="handleConfirm" :class="btnClasses">Confirm</button>
            </div>
        </div>
    </div>
</template>