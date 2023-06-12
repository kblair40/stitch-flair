<script lang="ts" setup>
import { FormKitMessages } from '@formkit/vue'

import { useCustomFetch } from '~~/composables/useCustomFetch';
import { useAdminStore } from '~~/store/adminStore';
import type { Category, Product } from '~~/utils/types';

type FormValue = string | number | boolean | null | undefined;

const store = useAdminStore();

const defaultFormValues: Product = {
    id: 0,
    name: '',
    category_id: 1,
    description: '',
    price: '',
    featured: false,
    on_sale: false,
    on_sale_price: '',
    image_url: '',
    etsy_url: '',
}

const formRef = ref<HTMLFormElement | null>(null);
const formValues = ref<Partial<Product>>({ ...defaultFormValues })
const initialFormValues = ref<Partial<Product>>({ ...defaultFormValues })

const loading = ref(false) // use with save method to prevent inputs from being modified

onBeforeMount(() => {
    const productToEdit = store.productToEdit as Product;
    console.log("productToEdit:", productToEdit);

    const newValues = { ...productToEdit, price: productToEdit.price.slice(1) };
    formValues.value = { ...newValues };
    initialFormValues.value = { ...newValues };
})

const handleSubmit = async (values: Product) => {
    console.log('Form values:', values)
    const diffs: { [key: string]: FormValue } = {}
    for (let key of Object.keys(values)) {
        if (initialFormValues.value[key] !== formValues.value[key]) {
            diffs[key] = formValues.value[key];
        }
    }

    console.log('DIFFS:', diffs);
    if (!Object.keys(diffs).length) {
        console.log('No form values seem to have changed');
        return;
    }

    loading.value = true;
    try {
        const res = await useCustomFetch(`/product/${values.id}`, {
            method: 'PATCH',
            body: diffs,
        })
        console.log('Update Product Res:', res.data.value, '\n');

        // Replaces now outdated product in adminStore with new values
        store.updateProducts(values);
    } catch (e) {
        console.log('Failed to create product:', e)
    }
    // setTimeout(() => {
    //     console.log('loading = false')
    loading.value = false
    // }, 1500);
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
]
</script>

<template>
    <div :class="wrapperClasses">
        <FormKit :actions="false" :disabled="loading" v-model="formValues" ref="formRef" :form-class="formClasses"
            type="form" id="product-form" @submit="handleSubmit">
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

            <FormKit type="submit" :data-loading="loading">
                <div v-if="loading" class="flex justify-center">
                    <img class="animate-spin" src="/icons/loading.svg" />
                </div>
                <p v-else>Save</p>
            </FormKit>

            <div class="text-center h-2 relative bottom-2">
                <FormKitMessages :node="formRef?.node" />
            </div>
        </FormKit>
    </div>
</template>