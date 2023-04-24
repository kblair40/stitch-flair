<script lang="ts" setup>
// 
const inputClasses = [
    'rounded-md focus-visible:outline-none px-3',
    'h-10 w-full transition-colors',
    'border border-whitepeach hover:border-whitepeach-500 focus:border-whitepeach-700'
]
const textareaClasses = [
    inputClasses[0],
    'w-full pt-2 transition-colors',
    inputClasses[2],
]
const buttonClasses = [
    'border border-whitepeach-300',
    'transition-colors duration-300',
    'w-1/2 mx-auto py-2 px-6 rounded-md',
    'text-lg font-medium',
    'bg-lightpeach-50 text-purplegrey-600',
    'hover:bg-lightpeach-100 active:bg-lightpeach-200',
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
    <div>
        <div class="flex flex-col space-y-6 items-center">
            <div class="flex space-x-6 w-full">
                <FormControl label="Name">
                    <input v-model="values.name" :class="inputClasses" />
                </FormControl>

                <FormControl label="Email">
                    <input v-model="values.email" :class="inputClasses" />
                </FormControl>
            </div>

            <FormControl label="Subject">
                <input v-model="values.subject" :class="inputClasses" />
            </FormControl>

            <FormControl label="Message">
                <textarea v-model="values.message" rows="3" :class="textareaClasses" />
            </FormControl>

            <button @click="handleSubmit" class="submit-btn" :class="buttonClasses">Send</button>
        </div>
    </div>
</template>

<style scoped lang="css">
.submit-btn {
    /* background-color: #CE882B; */
    /* opacity: 0.7; */
}
</style>