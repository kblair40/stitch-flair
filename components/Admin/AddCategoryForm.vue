<script lang="ts" setup>
import { reset } from '@formkit/core';
import { FormKitMessages } from '@formkit/vue'

import type { Category } from '~~/utils/types';
import { useAdminStore } from '~~/store/adminStore';

defineEmits(['submit'])

const store = useAdminStore();

const showSuccessToast = ref(false);
const formRef = ref<HTMLFormElement | null>(null);
const title = ref({ title: '' });
const handleSubmit = async (formValues: any) => {
    // console.log('formValues:', formValues);
    const { title } = formValues;
    try {
        if (!title) return;
        const res = await useCustomFetch('/category', {
            method: 'POST',
            body: { title: title.toLowerCase().trim() },
        })
        console.log('Create Category Res:', res.data.value, '\n');
        store.addCategory(res.data.value as Category);
        showSuccessToast.value = true;
        reset('category-form');

        setTimeout(() => {
            showSuccessToast.value = false;
        }, 3000)

    } catch (e) {
        console.log('Failed to create product:', e)
    }
}

const formClasses = [
    "w-full flex flex-col space-y-4 items-end",
    "sm:flex-row sm:space-x-4 sm:space-y-0 sm:items-end",
]
</script>

<template>
    <div>
        <Toast :visible="showSuccessToast">Saved Category</Toast>

        <FormKit :errors="[]" v-model="title" ref="formRef" id="category-form" @submit="handleSubmit" type="form"
            :actions="false">
            <div :class="formClasses">
                <div class="w-full h-18 max-h-18">
                    <FormKit name="title" label="Category Title" type="text" validation="required:trim|length:1,32" />
                </div>

                <div class="w-full sm:w-40">
                    <FormKit type="submit" validation-visibility="">Save</FormKit>
                </div>

                <div v-show="false" class="text-center h-2 relative bottom-2">
                    <FormKitMessages :node="formRef?.node" />
                </div>
            </div>
        </FormKit>
    </div>
</template>