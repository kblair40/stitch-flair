<script lang='ts' setup>
const tabLabels = ['Add Product', 'Edit Products', 'Add Category'];
const activeTab = ref(tabLabels[0])

definePageMeta({
    layout: 'admin'
})
</script> 

<template>
    <div class="flex flex-col items-center h-screen">
        <!-- <PageTitle>Admin</PageTitle> -->
        <!-- <div class="pt-2 flex justify-center border w-screen"> -->
        <div class="h-14">
            <div class="fixed top-0 pt-2 pb-1 left-1/2 -translate-x-1/2 border w-screen bg-white">
                <Tabs @change="(tab) => activeTab = tab" :tabLabels="tabLabels" />
            </div>
        </div>

        <!-- <div class="flex flex-col items-center px-3 sm:px-5 md:px-6 flex-1 pt-12 border border-red-300"> -->
        <div class="px-3 sm:px-5 md:px-6 flex-1 pt-16 border border-red-300 flex-1">
            <AdminAddProductForm v-if="activeTab === 'Add Product'" />
            <ProductListEditable v-else-if="activeTab === 'Edit Products'" />
        </div>
    </div>
</template>