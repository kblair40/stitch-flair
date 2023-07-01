<script lang="ts" setup>
import { reset } from '@formkit/core';
import { FormKitMessages } from '@formkit/vue'

import type { Promotion, PromoColor } from '~~/utils/types';
import { useAdminStore } from '~~/store/adminStore';
import ChipPromoEditable from '../ChipPromoEditable.vue';
import IconButton from '../IconButton.vue';

interface FormValues {
    text: string;
    color: PromoColor
}

const store = useAdminStore();
store.getPromotions();

const showSuccessToast = ref(false);
const showErrorToast = ref(false);
const successMsg = ref('');
const loading = ref(false);
const formRef = ref<HTMLFormElement | null>(null);
const formValues = ref<FormValues>({ text: '', color: 'green' });

const openSuccessToast = (endEdit = false, msg = "Saved Promotion") => {
    successMsg.value = msg;
    showSuccessToast.value = true;
    setTimeout(() => {
        showSuccessToast.value = false
        successMsg.value = ''
    }, 3000)

    if (endEdit) editing.value = null;
}

const handleSubmit = async (formValues: any) => {
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
            openSuccessToast();
            reset('promo-form');
        }
    } catch (e) {
        console.log('Failed to create product:', e)
    }

    loading.value = false;
}

const colors = ['Green', 'Red', 'Blue', 'Orange', 'Purple', 'Peach']
const colorOptions = computed(() => {
    return colors.map(color => {
        return { value: color.toLowerCase(), label: color }
    })
})

const formClasses = [
    "w-full flex flex-col space-y-4 items-end",
    "sm:flex-row sm:space-x-4 sm:space-y-0 sm:items-end",
]

const handleClickDelete = (id: number, idx: number) => {
    store.openConfirmModal('promo', { id, idx })
}
const handleConfirmDelete = async () => {
    const deleteRes = await store.deletePromo();
    if (!deleteRes) {
        showErrorToast.value = true;
        setTimeout(() => showErrorToast.value = false, 6000);
    } else {
        openSuccessToast(false, 'Deleted Promotion')
        // showSuccessToast.value = true;
        // setTimeout(() => showSuccessToast.value = true, 6000);
    }
}

const editing = ref<number | null>(null);
const handleClickEdit = (idx: number) => editing.value = idx;
const finishEdit = () => editing.value = null;
</script>

<template>
    <div class="flex flex-col items-center">
        <Toast :visible="showSuccessToast">{{ successMsg }}</Toast>
        <Toast :error="true" :visible="showErrorToast">Something went wrong</Toast>

        <div class="w-full max-w-75 sm:max-w-120 md:max-w-150 mt-6">
            <div class="w-full mb-12">
                <h3 class="font-semibold text-xl mb-3">Add Promo</h3>
                <FormKit :errors="[]" v-model="formValues" ref="formRef" id="promo-form" @submit="handleSubmit" type="form"
                    :actions="false">
                    <div :class="formClasses">
                        <div class="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 w-full">
                            <div class="w-full h-18 max-h-18">
                                <FormKit name="text" label="Promo Text Label *" type="text"
                                    validation="required:trim|length:1,32" />
                            </div>

                            <div class="w-full h-18 max-h-18">
                                <FormKit name="color" label="Color *" type="select" :options="colorOptions" />
                            </div>
                        </div>

                        <div class="w-full sm:w-40">
                            <FormButtonSubmit label="Save" :loading="loading" />
                        </div>

                        <div v-show="false" class="text-center h-2 relative bottom-2">
                            <FormKitMessages :node="formRef?.node" />
                        </div>
                    </div>
                </FormKit>

                <div class="mt-5 flex space-x-4">
                    <p class="font-medium text-lg">Preview</p>
                    <ChipPromo v-bind="formValues" />
                </div>
            </div>

            <div class="w-full">
                <h3 class="font-semibold text-xl mb-3">Edit Promos</h3>
                <div class="flex flex-wrap">
                    <div class="mr-6 mb-2" v-for="promo, i in store.promotions.data">
                        <div class="relative pr-16" v-if="!editing || editing !== promo.id">
                            <IconButton 
                                v-if="!!promo.id"
                                :disabled="editing === i"
                                icon="trash"
                                @click="handleClickDelete(promo.id, i)"
                                size="sm"
                                extra-classes="absolute -top-0.5 right-0"
                            />

                            <IconButton 
                                v-if="!!promo.id"
                                :disabled="editing === i"
                                icon="edit"
                                @click="handleClickEdit(i)"
                                size="sm"
                                extra-classes="absolute -top-0.5 right-8"
                            />
                            <ChipPromo :text="promo.text" :color="promo.color" />
                        </div>
                    </div>
                </div>
            </div>

            <div class="w-full mt-4 pt-4 min-h-12 border-t rounded-md" v-if="typeof editing === 'number'">
                <ChipPromoEditable @success="openSuccessToast(true)" @cancel="finishEdit" :idx="editing"
                    v-bind="store.promotions.data[editing]" />
            </div>
        </div>

        <ModalConfirm v-if="store.showConfirmModal" @confirm="handleConfirmDelete" @cancel="store.closeConfirmModal" />
    </div>
</template>