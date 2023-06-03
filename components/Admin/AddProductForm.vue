<script lang="ts" setup>
import { reset } from '@formkit/core';

defineEmits(['submit'])

const baseURL = 'http://localhost:3001';
const { data: categoryData, pending, error } = useFetch<{ id: string, title: string }[]>('/category', { baseURL });

// const defaultValues = {
//     name: '',
//     price: '',
//     description: '',
//     category_id: 0,
//     image_url: '',
//     featured: false,
//     on_sale: false,
//     on_sale_price: '',
// }
const handleSubmit = async (values: any) => {
    console.log('Form values:', values)

    try {
        const res = await useCustomFetch('/product', {
            method: 'POST',
            body: values,
        })
        console.log('Create Product Res:', res, '\n');
        reset('product-form') // clears all inputs
    } catch (e) {
        console.log('Failed to create product:', e)
    }
}

const categoryOptions = computed(() => {
    if (categoryData.value) {
        return categoryData.value.map(option => {
            return { label: option.title, value: option.id }
        })
    }
    return [];
})
const formClasses = 'flex flex-col w-full space-y-4 max-w-3xl'
const formSectionClasses = [
    "flex flex-col space-y-4",
    "md:flex-row md:space-x-4 md:space-y-0"
]
</script>

<template>
    <FormKit :actions="false" :form-class="formClasses" type="form" submit-label="Save" id="product-form"
        @submit="handleSubmit">
        <div :class="formSectionClasses">
            <FormKit name="title" label="Product Title" type="text" validation="required:trim|length:1,32" />
            <FormKit name="category_id" label="Category" type="select" :options="categoryOptions" validation="required" />
        </div>

        <div :class="formSectionClasses">
            <FormKit name="description" label="Description" type="textarea" rows="3" />
            <FormKit validation="required" name="price" label="Price" type="number" />
        </div>

        <div class="flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 md:space-x-8">
            <div class="flex space-x-4 md:space-x-8">
                <FormKit name="featured" label="Featured?" type="checkbox" />
                <FormKit name="on_sale" label="On Sale?" type="checkbox" />
            </div>
            <FormKit label="Sale Price" name="on_sale_price" type="number" />
        </div>

        <div :class="formSectionClasses">
            <FormKit validation="required" name="image_url" label="Image URL" type="text" />
        </div>

        <FormKit type="submit" label="Save" />
    </FormKit>
</template>