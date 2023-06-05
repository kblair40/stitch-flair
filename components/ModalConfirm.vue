<script lang="ts" setup>
import { useAdminStore } from '~~/store/adminStore';
// interface Props {
//     isOpen: boolean;
// }
// const props = defineProps<Props>()
const emit = defineEmits(['confirm', 'cancel']);

const store = useAdminStore();

const handleConfirm = () => {
    didMount.value = false;
    emit('confirm')
}
const handleCancel = () => {
    didMount.value = false;
    emit('cancel')
}
const didMount = ref(false);
onMounted(() => didMount.value = true)

const wrapperClasses = computed(() => {
    return [
        'z-50 shadow-lg fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-white',
        'py-4 px-3 max-w-lg w-4/5 sm:w-5/6 md:w-1/2 transition-opacity',
        `${didMount.value ? 'opacity-100' : 'opacity-0'}`,
        'border border-red-500'
    ]

})
const btnClasses = [
    'border border-slate-300 px-3 py-1 rounded-md'
]
const overlayClasses = [
    'z-50 fixed top-0 bottom-0 left-0 right-0 w-screen h-screen',
    'bg-slate-300/50',
    'border border-blue-600'
]
const handleClickOverlay = () => {
    console.log('\nOVERLAY CLICKED\n')
    handleCancel()
}
</script>

<template>
    <div v-if="store.showConfirmModal" class="z-50">
        <div :class="overlayClasses" @click="handleClickOverlay" />
        <div :class="wrapperClasses">
            <h3 class="text-lg font-medium mb-5 z-50">Please confirm you want to delete this product</h3>

            <div class="flex space-x-4 w-full justify-end z-50">
                <button @click="handleCancel" :class="btnClasses">Cancel</button>
                <button @click="handleConfirm" :class="btnClasses">Confirm</button>
            </div>
        </div>
    </div>
</template>