<script lang="ts" setup>
import { reset } from '@formkit/core';
import { FormKitMessages } from '@formkit/vue'

import type { Category } from '~~/utils/types';
import { useAdminStore } from '~~/store/adminStore';

defineEmits(['submit'])

const store = useAdminStore();

const errorMsg = ref('');
const showErrorToast = ref(false);
const showSuccessToast = ref(false);
const formRef = ref<HTMLFormElement | null>(null);
const title = ref({ title: '' });
const loading = ref(false);

const handleSubmit = async (formValues: any) => {
    // console.log('formValues:', formValues);
    const { title } = formValues;
    try {
        if (!title) return;
        loading.value = true;
        const res = await useCustomFetch('/category', {
            method: 'POST',
            body: { title: title.toLowerCase().trim() },
        })

        if (res.data.value) {
            console.log('Create Category Res:', res.data.value, '\n');
            store.addCategory(res.data.value as Category);
            showSuccessToast.value = true;
            reset('category-form');

            setTimeout(() => {
                showSuccessToast.value = false;
            }, 6000)
        } else {
            console.log('res:', res);
            let msg = 'Something went wrong';
            if (res.error.value && res.error.value.response) {
                msg = res.error.value.response._data.message
            }

            errorMsg.value = msg;
            showErrorToast.value = true;
            setTimeout(() => {
                showErrorToast.value = false;
                errorMsg.value = '';
            }, 6000)
        }
    } catch (e) {
        console.log('Failed to create product:', e)
    }

    loading.value = false;
}

const formClasses = [
    "w-full flex flex-col space-y-4 items-end",
    // "lg:flex-row lg:space-x-4 lg:space-y-0 lg:items-end",
]
</script>

<template>
    <div>
        <Toast :visible="showSuccessToast">Saved Category</Toast>
        <Toast :error="true" :visible="showErrorToast">{{ errorMsg }}</Toast>

        <FormKit :errors="[]" v-model="title" ref="formRef" id="category-form" @submit="handleSubmit" type="form"
            :actions="false">
            <div :class="formClasses">
                <div class="w-full">
                    <FormKit name="title" label="Category Title *" type="text" validation="required:trim|length:1,32" />
                </div>

                <!-- <div class="w-full sm:w-40"> -->
                <div class="w-full">
                    <FormButtonSubmit :loading="loading" label="Save" />
                </div>

                <div v-show="false" class="text-center h-2 relative bottom-2">
                    <FormKitMessages :node="formRef?.node" />
                </div>
            </div>
        </FormKit>
    </div>
</template>