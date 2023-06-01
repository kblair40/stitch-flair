<script lang="ts" setup>
defineEmits(['submit'])

const inputSizes = {
    'input': 'h-10 w-full',
    'checkbox': 'h-6 w-6',
    'textarea': 'w-full py-1.5',
}
const inputBaseClasses = [
    'rounded-md focus-visible:outline-none px-3 transition-colors',
    'border border-whitepeach hover:border-whitepeach-500 focus:border-whitepeach-700',
    'disabled:text-gray-400 disabled:bg-slate-50 disabled:cursor-not-allowed'
]
const inputClasses = [
    inputSizes['input'],
    ...inputBaseClasses
]
const checkboxClasses = [
    inputSizes['checkbox'],
    ...inputBaseClasses
]
const textareaClasses = [
    inputSizes['textarea'],
    ...inputBaseClasses
]
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
const formValidators = {
    'name': (val: string) => typeof val === 'string' && val.length > 3 && val.length < 36,
    'price': (val: number) => typeof val === 'number',
    'category_id': (val: number) => typeof val === 'number',
    'image_url': (val: string) => typeof val === 'string',
}
const formFields = ['name', 'price', 'description', 'category_id', 'image_url', 'featured', 'on_sale', 'on_sale_price']
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
const formErrors = {}

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

const handleChangeCategory = (category: number) => {
    console.log('\nChange Category:', category);
    values.category_id = category;
}
</script>

<template>
    <div :class="formClasses">
        <div :class="formRowClasses">
            <FormControl label="Product Title">
                <input v-model="values.name" :class="inputClasses" />
            </FormControl>

            <FormControl label="Category" required>
                <AdminCategorySelect @change="handleChangeCategory" />
            </FormControl>
        </div>

        <div :class="formRowClasses">
            <!-- <FormControl label="Description">
                <textarea :rows="2" v-model="values.description" :class="textareaClasses" />
            </FormControl> -->

            <FormKit label="Description" type="textarea" rows="3" />
            <FormKit label="Price" type="number" />

            <!-- <FormControl label="Price" required>
                <input type="number" min="0" step=".1" v-model.number="values.price" :class="inputClasses" />
            </FormControl> -->
        </div>

        <div class="w-max flex space-x-8">
            <FormControl label="Featured?">
                <input type="checkbox" v-model="values.featured" :class="checkboxClasses" />
            </FormControl>

            <FormControl label="On Sale?">
                <input type="checkbox" v-model="values.on_sale" :class="checkboxClasses" />
            </FormControl>

            <div :class="inputSizes['input']">
                <FormControl label="Sale Price">
                    <input :disabled="!values.on_sale" min="0" step=".1" v-model.number="values.on_sale_price"
                        :class="inputClasses" class="w-40" />
                </FormControl>
            </div>
        </div>

        <div :class="formRowClasses" required>
            <FormControl label="Image URL">
                <input v-model="values.image_url" :class="inputClasses" />
            </FormControl>
        </div>

        <button @click="handleSubmit" class="submit-btn" :class="buttonClasses">Save</button>
    </div>
</template>