<script lang="ts" setup>
// 
const inputClasses = [
    'rounded-md focus-visible:outline-none px-3',
    'h-10 w-full',
]
const textareaClasses = [
    inputClasses[0],
    'w-full pt-2'
]
const buttonClasses = [
    'border'
]
</script>

<template>
    <div class="flex flex-col space-y-6">
    <div class="flex space-x-6">
            <FormControl label="Name">
                <input :class="inputClasses" />
            </FormControl>

            <FormControl label="Email">
                <input :class="inputClasses" />
            </FormControl>
            <!-- <input :class="inputClasses" />
                    <input :class="inputClasses" /> -->
        </div>

        <div>
            <FormControl label="Subject">
                <input :class="inputClasses" />
            </FormControl>
        </div>

        <div>
            <FormControl label="Message">
                <textarea rows="3" :class="textareaClasses" />
            </FormControl>
        </div>

        <div>
            <button :class="buttonClasses">Send</button>
        </div>
    </div>
</template>

<style scoped lang="css">
input {}
</style>