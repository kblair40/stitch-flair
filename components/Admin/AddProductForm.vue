<script lang="ts" setup>
const inputClasses = [
    'rounded-md focus-visible:outline-none px-3',
    'h-10 w-full transition-colors',
    'border border-whitepeach hover:border-whitepeach-500 focus:border-whitepeach-700'
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
    'border border-red-300',
    'flex'
]

const values = reactive({
    name: '',
    price: '',
    description: '',
    category: '',
    image_url: '',
    featured: false,
    on_sale: false,
    on_sale_price: '',
})

const handleSubmit = () => {
    const vals = values;
    console.log('\nVALS:', vals.name);

}
</script>

<template>
    <div :class="formClasses">
        <FormControl label="Product Title">
            <input v-model="values.name" :class="inputClasses" />
        </FormControl>

        <FormControl label="Description">
            <textarea v-model="values.description" :class="inputClasses" />
        </FormControl>

        <FormControl label="Price">
            <input v-model="values.price" :class="inputClasses" />
        </FormControl>

        <FormControl label="Category">
            <input v-model="values.category" :class="inputClasses" />
        </FormControl>

        <FormControl label="Image URL">
            <input v-model="values.image_url" :class="inputClasses" />
        </FormControl>

        <FormControl label="On Sale?">
            <input type="checkbox" v-model="values.on_sale" :class="inputClasses" />
        </FormControl>

        <FormControl label="Sale Price">
            <input v-model="values.featured" :class="inputClasses" />
        </FormControl>

        <FormControl label="Featured?">
            <input type="checkbox" v-model="values.featured" :class="inputClasses" />
        </FormControl>

        <button @click="handleSubmit" class="submit-btn" :class="buttonClasses">Send</button>
    </div>
</template>