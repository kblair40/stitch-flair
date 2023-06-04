<script lang="ts" setup>
import { reset } from '@formkit/core';
import { FormKitMessages } from '@formkit/vue'

defineEmits(['submit'])

const formRef = ref<HTMLFormElement | null>(null)

const baseURL = 'http://localhost:3001';
const { data: categoryData, pending, error } = useFetch<{ id: string, title: string }[]>('/category', { baseURL });

const formValues = ref({
    title: '',
    category_id: 1,
    description: '',
    price: '',
    featured: false,
    on_sale: false,
    on_sale_price: '',
    image_url: '',
})
const handleSubmit = async (values: any) => {
    console.log('Form values:', values)

    try {
        const res = await useCustomFetch('/product', {
            method: 'POST',
            body: values,
        })
        console.log('Create Product Res:', res.data, '\n');
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
    "lg:flex-row lg:space-x-4 lg:space-y-0"
]
</script>

<template>
    <div class="w-full flex flex-col items-center md:flex-row md:items-start md: space-x-6">
        <FormKit v-model="formValues" ref="formRef" :form-class="formClasses" type="form" submit-label="Save"
            id="product-form" @submit="handleSubmit">
            <div :class="formSectionClasses">
                <FormKit name="name" label="Product Name" type="text" validation="required:trim|length:1,32" />
                <FormKit name="category_id" label="Category" type="select" :options="categoryOptions"
                    validation="required" />
            </div>

            <div :class="formSectionClasses">
                <FormKit name="description" label="Description" type="textarea" rows="3" />
                <FormKit validation="required" name="price" label="Price" type="number" :step="0.01" />
            </div>

            <div class="flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 lg:space-x-8">
                <div class="flex space-x-4 lg:space-x-8">
                    <FormKit name="featured" label="Featured?" type="checkbox" />
                    <FormKit name="on_sale" label="On Sale?" type="checkbox" />
                </div>
                <FormKit label="Sale Price" name="on_sale_price" type="number" :step="0.01" />
            </div>

            <div :class="formSectionClasses">
                <FormKit validation="required" name="image_url" label="Image URL" type="text" />
            </div>

            <div class="text-center h-2 relative bottom-2">
                <FormKitMessages :node="formRef?.node" />
            </div>
        </FormKit>


        <div class="flex flex-col mt-8 md:mt-0">
            <h4 class="text-xl font-medium mb-2">Preview</h4>
            <ProductPreview :title="formValues.title" :img-url="formValues.image_url" :price="formValues.price" />
        </div>

    </div>
</template>