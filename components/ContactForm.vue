<script lang="ts" setup>
// 
const inputClasses = [
    'rounded-md focus-visible:outline-none',
    'h-10 w-full',
    'px-3'
]
</script>

<template>
    <div class="flex flex-col space-y-6">
        <div class="flex space-x-6">
            <FormControl label="Name">
                <input :class="inputClasses" />
            </FormControl>
            <input :class="inputClasses" />
            <input :class="inputClasses" />
        </div>

        <div class="flex space-x-6">
            <input :class="inputClasses" />
            <input :class="inputClasses" />
        </div>
    </div>
</template>

<style scoped lang="css">
input {}
</style>