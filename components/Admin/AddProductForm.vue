<script lang="ts" setup>
import { reset } from '@formkit/core';
import { FormKitMessages } from '@formkit/vue'

import { useAdminStore } from '~~/store/adminStore';
import { toTitleCase } from '~~/utils/helpers';
import type { Product } from '~~/utils/types';

type FormValues = Omit<Product, "id">;

defineEmits(['submit'])

const store = useAdminStore();
store.getCategories();
store.getPromotions();

const loading = ref(false);
const showSuccessToast = ref(false);
const showErrorToast = ref(false);
const errorMsg = ref('');
const formRef = ref<HTMLFormElement | null>(null)

const formValues = ref<FormValues>({
    name: '',
    category_id: -1,
    promo_ids: [],
    description: '',
    price: '',
    featured: false,
    on_sale: false,
    on_sale_price: '',
    image_url: '',
    etsy_url: '',
})

const handleSubmit = async (values: any) => {
    loading.value = true;
    values = { ...values, name: values.name.toLowerCase().trim() }
    try {
        const res = await useCustomFetch('/product', {
            method: 'POST',
            body: values,
        })
        console.log('Create Product Res:', res);

        if (res.error && res.error.value) {
            showErrorToast.value = true;
            errorMsg.value = res.error.value.response?._data.message || 'Something went wrong';

            setTimeout(() => {
                showErrorToast.value = false;
                errorMsg.value = ''
            }, 6000)

        } else {
            showSuccessToast.value = true;
            setTimeout(() => {
                showSuccessToast.value = false;
            }, 6000)

            reset('product-form') // clears all inputs
        }

    } catch (e) {
        console.log('Failed to create product:', e)
        errorMsg.value = 'Something went wrong'
        showErrorToast.value = true;
        setTimeout(() => {
            showErrorToast.value = false;
            errorMsg.value = '';
        })
    }
    loading.value = false;
}

const categoryOptions = computed(() => {
    console.log('STORE.CATEGORIES:', store.categories.data);
    if (!store.categories.loading && store.categories.data.length) {
        let options = store.categories.data.map(category => {
            return {
                label: toTitleCase(category.title),
                value: category.id,
            };
        })
        console.log('Category Options:', options);
        return [{ label: 'Select Category', value: -1 }, ...options];
    }
    return [];
})

const promoOptions = computed(() => {
    console.log('\nstore.promotions:', store.promotions.data);
    if (!store.promotions.loading && store.promotions.data.length) {
        let options = store.promotions.data.map(promotion => ({
            label: promotion.text,
            value: promotion.id,
        }))
        console.log('Promo Options:', options);

        return options;
    }

    return []
})

const selectedPromos = computed(() => {
    const promoIds = formValues.value.promo_ids;
    if (!promoIds) return [];

    const promos = [];
    for (let promoId of promoIds) {
        const promo = store.promotions.data.find(p => p.id === promoId)
        if (promo) promos.push({ text: promo.text, color: promo.color });
    }
    return promos;
})

const heightClasses = ['h-8', 'h-14']
const multiSelectClasses = computed(() => {
    const promoCount = promoOptions.value.length
    const heightClass = promoCount > 2 ? 'h-24' : heightClasses[promoCount - 1];
    const paddingClass = !!promoCount ? 'pt-1' : '';
    return [heightClass, paddingClass].join(' ')
})
const formWrapperClasses = [
    // "border border-red-300",
    "flex flex-col items-center md:flex-row md:items-start md:justify-center",
    "w-full pt-6 md:space-x-6 lg:space-x-12 lg:px-4 xl:px-8"
]
const formClasses = 'flex flex-col w-full space-y-4 max-w-4xl'
const formSectionClasses = [
    "flex flex-col space-y-4",
    "lg:flex-row lg:space-x-4 lg:space-y-0"
]
</script>

<template>
    <div class="pb-4">
        <div :class="formWrapperClasses">
            <Toast :visible="showSuccessToast">Saved</Toast>
            <Toast :error="true" :visible="showErrorToast">{{ errorMsg }}</Toast>

            <FormKit v-model="formValues" ref="formRef" :form-class="formClasses" type="form" :actions="false"
                id="product-form" @submit="handleSubmit">
                <div :class="formSectionClasses">
                    <FormKit name="name" label="Product Name *" type="text" validation="required:trim|length:1,60" />
                    <FormKit name="category_id" label="Category *" type="select" :options="categoryOptions"
                        validation="required|min:0" :validation-messages="{ min: 'Category is required' }" />
                </div>

                <div :class="formSectionClasses">
                    <FormKit name="description" label="Description" type="textarea" rows="3" />
                    <FormKit validation="required" name="price" label="Price *" type="number" :step="0.01" />
                </div>

                <div class="flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 lg:space-x-8">
                    <div class="flex space-x-4 lg:space-x-8">
                        <FormKit name="featured" label="Featured?" type="checkbox" />
                        <FormKit name="on_sale" label="On Sale?" type="checkbox" />
                    </div>
                    <FormKit label="Sale Price" name="on_sale_price" type="number" :step="0.01" />
                </div>

                <div :class="formSectionClasses">
                    <FormKit multiple type="select" name="promo_ids" label="Promotion" :options="promoOptions"
                        :input-class="multiSelectClasses"
                        help="Click on promo while holding command (macOS) or control (PC) to deselect a promo or to select multiple" />
                </div>

                <div :class="formSectionClasses">
                    <FormKit validation="required" name="image_url" label="Image URL *" type="text" />
                    <FormKit validation="required" name="etsy_url" label="Etsy URL *" type="text" />
                </div>

                <div class="text-center h-2 relative bottom-2">
                    <FormKitMessages :node="formRef?.node" />
                </div>

                <FormButtonSubmit label="Save" :loading="loading" />
            </FormKit>


            <div class="flex flex-col mt-8 md:mt-0 min-w-75">
                <h4 class="text-xl font-medium mb-1 text-center">Preview</h4>
                <ProductCard v-bind="{ ...formValues, promos: selectedPromos }" :preview="true" />
            </div>
        </div>
    </div>
</template>