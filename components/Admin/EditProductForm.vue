<script lang="ts" setup>
import { FormKitMessages } from '@formkit/vue'

import { useAdminStore } from '~~/store/adminStore';
import type { Category, Product } from '~~/utils/types';

const store = useAdminStore();

const formRef = ref<HTMLFormElement | null>(null);
const formValues = ref<Partial<Product>>({
    name: '',
    category_id: 1,
    description: '',
    price: '',
    featured: false,
    on_sale: false,
    on_sale_price: '',
    image_url: '',
    etsy_url: '',
})

const loading = ref(false) // use with save method to prevent inputs from being modified

onBeforeMount(() => {
    const productToEdit = store.productToEdit as Product;
    console.log("productToEdit:", productToEdit);
    formValues.value = {
        ...productToEdit,
        price: productToEdit.price.slice(1),
    };
})

const handleSubmit = async (values: any) => {
    console.log('Form values:', values)
    try {
        const res = await useCustomFetch('/product', {
            method: 'PATCH',
            body: values,
        })
        console.log('Create Product Res:', res.data, '\n');

    } catch (e) {
        console.log('Failed to create product:', e)
    }
}

const categoryOptions = computed(() => {
    const { data: categories } = store.categories;
    if (categories && Array.isArray(categories) && categories.length) {
        // console.log('Categories:', categories);
        return categories.map((category: Category) => ({
            label: category.title,
            value: category.id,
        }))
    }

    return [];
})

const wrapperClasses = [
    "px-2 pt-2 pb-1 md:px-4",
]
const formClasses = 'flex flex-col w-full space-y-4 max-w-4xl'
const formSectionClasses = [
    "flex flex-col space-y-4",
    // "lg:flex-row lg:space-x-4 lg:space-y-0"
]
</script>

<template>
    <div :class="wrapperClasses">
        <FormKit :disabled="loading" v-model="formValues" ref="formRef" :form-class="formClasses" type="form"
            submit-label="Save" id="product-form" @submit="handleSubmit">
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
                <FormKit validation="required" name="etsy_url" label="Etsy URL" type="text" />
            </div>

            <div class="text-center h-2 relative bottom-2">
                <FormKitMessages :node="formRef?.node" />
            </div>
        </FormKit>
    </div>
</template>