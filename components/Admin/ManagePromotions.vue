<script lang="ts" setup>
import { reset } from '@formkit/core';
import { FormKitMessages } from '@formkit/vue'

import type { Promotion } from '~~/utils/types';
import { useAdminStore } from '~~/store/adminStore';

const store = useAdminStore();

const showSuccessToast = ref(false);
const formRef = ref<HTMLFormElement | null>(null);
const formValues = ref({ text: '', color: 'green' });

const handleSubmit = async (formValues: any) => {
    console.log('formValues:', formValues);
    const { text } = formValues;
    try {
        if (!text) return;
        const res = await useCustomFetch('/promotion', {
            method: 'POST',
            body: { text: text.toLowerCase().trim() },
        })
        console.log('Create Promotion Res:', res.data.value, '\n');
        store.addPromotion(res.data.value as Promotion);
        showSuccessToast.value = true;
        reset('promo-form');

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
    <div class="flex flex-col items-center">
        <Toast :visible="showSuccessToast">Saved Promotion</Toast>

        <div class="w-full max-w-75 sm:max-w-120 md:max-w-150 mt-6">
            <div class="w-full mb-20">
                <h3 class="font-semibold text-xl mb-3">All Promos</h3>
                <p class="m-0">Edit/delete promo forms here</p>
            </div>

            <div class="w-full">
                <h3 class="font-semibold text-xl mb-3">Add Promo</h3>
                <FormKit :errors="[]" v-model="formValues" ref="formRef" id="promo-form" @submit="handleSubmit" type="form"
                    :actions="false">
                    <div :class="formClasses">
                        <div class="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 w-full">
                            <div class="w-full h-18 max-h-18">
                                <FormKit name="text" label="Promo Text" type="text"
                                    validation="required:trim|length:1,32" />
                            </div>

                            <div class="w-full h-18 max-h-18">
                                <FormKit name="color" label="Color" type="select"
                                    :options="['green', 'blue', 'orange', 'peach']" />
                            </div>
                        </div>

                        <div class="w-full sm:w-40">
                            <FormKit type="submit" validation-visibility="">Save</FormKit>
                        </div>

                        <div v-show="false" class="text-center h-2 relative bottom-2">
                            <FormKitMessages :node="formRef?.node" />
                        </div>
                    </div>
                </FormKit>

                <div class="mt-6 flex space-x-4">
                    <p class="font-medium text-lg">Preview</p>
                    <ChipPromo v-bind="formValues" />
                </div>
            </div>

        </div>
    </div>
</template>