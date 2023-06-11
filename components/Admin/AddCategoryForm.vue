<script lang="ts" setup>
import { reset } from '@formkit/core';

defineEmits(['submit'])

const showSuccessToast = ref(false);
const formRef = ref<HTMLFormElement | null>(null);
const title = ref({ title: '' });
const handleSubmit = async (formValues: any) => {
    // console.log('Category Title:', title)
    console.log('formValues:', formValues);
    try {
        if (!title.value) return;
        const res = await useCustomFetch('/category', {
            method: 'POST',
            body: { title },
        })
        console.log('Create Category Res:', res.data, '\n');
        showSuccessToast.value = true;
        console.log('Show Succes Toast Value:', showSuccessToast.value)
        // title.value = '';
        reset('category-form');

        setTimeout(() => {
            showSuccessToast.value = false;
            console.log('Show Succes Toast Value:', showSuccessToast.value)
        }, 3000)

    } catch (e) {
        console.log('Failed to create product:', e)
    }
}

const formClasses = [
    "w-full flex flex-col space-y-4 items-end",
    "sm:flex-row sm:space-x-4 sm:space-y-0"
]
</script>

<template>
    <div>
        <Toast :visible="showSuccessToast">Saved Category</Toast>

        <FormKit v-model="title" ref="formRef" id="category-form" @submit="handleSubmit" type="form" :actions="false">
            <div :class="formClasses">
                <div class="w-full">
                    <FormKit name="title" label="Category Title" type="text" validation="required:trim|length:1,32" />
                </div>

                <div class="w-full sm:w-40">
                    <FormKit type="submit">Save</FormKit>
                </div>
            </div>
        </FormKit>
    </div>
</template>