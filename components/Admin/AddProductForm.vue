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
    email: '',
    subject: '',
    message: ''
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

        <button @click="handleSubmit" class="submit-btn" :class="buttonClasses">Send</button>
    </div>
</template>