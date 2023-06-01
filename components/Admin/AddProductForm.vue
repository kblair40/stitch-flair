<script lang="ts" setup>
defineEmits(['submit'])

const baseURL = 'http://localhost:3001';
const { data: categoryData, pending, error } = useFetch<{ id: string, title: string }[]>('/category', { baseURL });

const buttonClasses = [
    'border border-whitepeach-300',
    'transition-colors duration-300',
    'w-1/2 mx-auto py-2 px-6 rounded-md',
    'text-lg font-medium',
    'bg-lightpeach-50 text-purplegrey-600',
    'hover:bg-lightpeach-100 active:bg-lightpeach-200',
]
const formClasses = [
    // 'border border-red-300',
    'flex flex-col w-full',
    'space-y-4 max-w-3xl'
]
const formRowClasses = [
    "flex space-x-4"
]
const defaultValues = {
    name: '',
    price: '',
    description: '',
    category_id: 0,
    image_url: '',
    featured: false,
    on_sale: false,
    on_sale_price: '',
}
const values = reactive(defaultValues);

const handleSubmit = async () => {
    const vals = { ...values }
    console.log('\nForm Values:', vals);
    const errors = {};

    // const body = {
    //     name: val
    // }

    try {
        const res = await useCustomFetch('/product', {
            method: 'POST',
            body: values,
        })
        console.log('\nCreate Product Res:', res, '\n');
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
</script>

<template>
    <div :class="formClasses">
        <div :class="formRowClasses">
            <FormKit name="title" label="Product Title" type="text" />
            <FormKit name="category" label="Product Title" type="select" :options="categoryOptions" />
        </div>

        <div :class="formRowClasses">
            <FormKit name="description" label="Description" type="textarea" rows="3" />
            <FormKit name="price" label="Price" type="number" />
        </div>

        <div class="w-max flex space-x-8">
            <FormKit name="featured" label="Featured?" type="checkbox" />
            <FormKit name="on_sale" label="On Sale?" type="checkbox" />

            <!-- <FormKit label="Sale Price" :disabled="!values.on_sale" name="on_sale_price" type="number" /> -->
            <FormKit label="Sale Price" name="on_sale_price" type="number" />
        </div>

        <div :class="formRowClasses" required>
            <FormKit name="image_url" label="Image URL" type="text" />
        </div>

        <button @click="handleSubmit" class="submit-btn" :class="buttonClasses">Save</button>
    </div>
</template>