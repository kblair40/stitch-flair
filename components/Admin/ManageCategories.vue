<script lang="ts" setup>
// const wrapperClasses = "flex flex-col items-center w-full mt-6"
// const formWrapperClasses = "mb-10 min-w-70 max-w-90 lg:w-full md:mt-0"
</script>

<template>
    <div class="flex flex-col items-center w-full mt-6">
        <div class="mb-10 min-w-70 max-w-90 lg:w-full md:mt-0">
            <p class="text-lg font-semibold mb-2">Add Category</p>
            <AdminAddCategoryForm />
        </div>

        <AdminEditCategoryList />
    </div>
</template>