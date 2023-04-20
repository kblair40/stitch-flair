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
    'border border-slate-100',
    'transition-colors duration-300',
    'rounded-md py-2 px-6 text-lg font-medium',
    'w-1/2 mx-auto',
    'bg-white text-slate-800',
    'hover:bg-slate-50 hover:border-slate-200',
    'active:bg-slate-100 active:border-slate-300',
]
</script>

<template>
    <div class="flex flex-col space-y-6 items-center">
        <div class="flex space-x-6 w-full">
            <FormControl label="Name">
                <input :class="inputClasses" />
            </FormControl>

            <FormControl label="Email">
                <input :class="inputClasses" />
            </FormControl>
            <!-- <input :class="inputClasses" />
                        <input :class="inputClasses" /> -->
        </div>

        <!-- <div class="w-full"> -->
            <FormControl label="Subject">
                <input :class="inputClasses" />
            </FormControl>
        <!-- </div> -->

        <!-- <div> -->
            <FormControl label="Message">
                <textarea rows="3" :class="textareaClasses" />
            </FormControl>
        <!-- </div> -->

        <!-- <div> -->
            <button class="submit-btn" :class="buttonClasses">Send</button>
        <!-- </div> -->
    </div>
</template>

<style scoped lang="css">
input {}

.submit-btn {
    /* background-color: #CE882B; */
    /* opacity: 0.7; */
}
</style>