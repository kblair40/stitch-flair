<script lang="ts" setup>
import { useAdminStore } from '~~/store/adminStore';

const store = useAdminStore();

const emit = defineEmits(['close', 'error', 'success'])

const handleError = (msg: string) => {
    console.log('msg in modal:', msg);
    emit('error', msg);
}

const wrapperClasses = [
    'z-40 shadow-lg fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-white',
    'max-w-xl w-4/5 sm:w-5/6 md:w-3/4 lg:w-2/3 transition-opacity rounded-md',
]
const innerWrapperClasses = 'relative h-full w-full pt-8 pb-4 px-3';
const overlayClasses = 'z-40 fixed top-0 bottom-0 left-0 right-0 w-screen h-screen'
</script>

<template>
    <div v-if="store.showEditProductModal" class="z-50">
        <div :class="overlayClasses" class="bg-slate-300/50" @click="$emit('close')" />
        <div :class="wrapperClasses">
            <div :class="innerWrapperClasses">
                <IconButton 
                    @click="$emit('close')" 
                    icon="close" 
                    extra-classes="absolute top-2 right-2"
                />

                <AdminEditProductForm @success="$emit('success')" @done="$emit('close')" @error="handleError" />
            </div>
        </div>
    </div>
</template>