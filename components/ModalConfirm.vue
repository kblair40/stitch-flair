<script lang="ts" setup>
// interface Props {
//     isOpen: boolean;
// }
// const props = defineProps<Props>()
const emit = defineEmits(['confirm', 'cancel']);

const handleConfirm = () => {
    emit('confirm')
}
const handleCancel = () => {
    emit('cancel')
}
const didMount = ref(false);
onMounted(() => didMount.value = true)

const wrapperClasses = computed(() => {
    return [
        'shadow-lg fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-white',
        'py-4 px-3 max-w-lg w-4/5 sm:w-5/6 md:w-1/2 transition-opacity',
        `${didMount.value ? 'opacity-100' : 'opacity-0'}`
    ]

})
const btnClasses = [
    'border border-slate-300 px-3 py-1 rounded-md'
]
</script>

<template>
    <div :class="wrapperClasses">
        <h3 class="text-lg font-medium mb-5">Please confirm you want to delete this product</h3>

        <div class="flex space-x-4 w-full justify-end">
            <button @click="handleCancel" :class="btnClasses">Cancel</button>
            <button @click="handleConfirm" :class="btnClasses">Confirm</button>
        </div>
    </div>
</template>