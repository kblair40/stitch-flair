<script lang="ts" setup>
import { reset } from '@formkit/core';
import { FormKitMessages } from '@formkit/vue'

// import { toTitleCase } from '~~/utils/helpers';
import type { Promotion, PromoColor } from '~~/utils/types';
import { useAdminStore } from '~~/store/adminStore';

interface FormValues {
    text: string;
    color: PromoColor
}

const store = useAdminStore();
store.getPromotions();

const showSuccessToast = ref(false);
const loading = ref(false);
const formRef = ref<HTMLFormElement | null>(null);
const formValues = ref<FormValues>({ text: '', color: 'green' });

const handleSubmit = async (formValues: any) => {
    console.log('formValues:', formValues);
    const { text, color } = formValues;
    try {
        if (!text || !color) return;

        loading.value = true;

        const res = await useCustomFetch('/promotion', {
            method: 'POST',
            body: { text: text.trim(), color },
        })

        console.log('Create Promotion Res:', res.data.value, '\n');
        if (res.data.value) {
            store.addPromotion(res.data.value as Promotion);
            showSuccessToast.value = true;
            reset('promo-form');

            setTimeout(() => {
                showSuccessToast.value = false;
            }, 3000)
        }
    } catch (e) {
        console.log('Failed to create product:', e)
    }

    setTimeout(() => {
        loading.value = false;
    }, 2000)
}

const colorOptions = ['green', 'red', 'blue', 'orange', 'purple', 'peach'];
const formClasses = [
    "w-full flex flex-col space-y-4 items-end",
    "sm:flex-row sm:space-x-4 sm:space-y-0 sm:items-end",
]
const deleteBtnClasses = [
    // 'border border-red-300',
    'border border-slate-300',
    'h-5 w-5 rounded-full absolute top-0.5 right-0.5 z-10',
    'transition-colors bg-white hover:bg-red-50 active:bg-red-100'
]
</script>

<template>
    <div class="flex flex-col items-center">
        <Toast :visible="showSuccessToast">Saved Promotion</Toast>

        <div class="w-full max-w-75 sm:max-w-120 md:max-w-150 mt-6">
            <div class="w-full mb-20">
                <h3 class="font-semibold text-xl mb-3">All Promos</h3>
                <div class="flex flex-wrap border">
                    <div class="relative pr-6 mr-4 mb-2" v-for="promo in store.promotions.data">
                        <button :class="deleteBtnClasses">
                            <img class="scale-90" src="/icons/close.svg" />
                        </button>
                        <ChipPromo :text="promo.text" :color="promo.color" />
                    </div>
                </div>
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
                                <FormKit name="color" label="Color" type="select" :options="colorOptions" />
                            </div>
                        </div>

                        <div class="w-full sm:w-40">
                            <FormKit :disabled="loading" :loading="loading" type="submit">Save</FormKit>
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