<script lang="ts" setup>
const wrapperClasses = [
    "flex flex-col items-center w-full mt-6",
    "md:flex-row md:justify-center md:items-start md:px-4 md:space-x-16",
    "lg:px-8 lg:space-x-32"
]

const formWrapperClasses = [
    "mt-10 w-full max-w-90",
    "md:mt-0"
]
</script>

<template>
    <div :class="wrapperClasses">
        <AdminEditCategoryList />
        <div :class="formWrapperClasses">
            <p class="text-lg font-semibold mb-2">Add Category</p>
            <AdminAddCategoryForm />
        </div>
    </div>
</template>