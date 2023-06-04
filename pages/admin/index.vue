<script lang='ts' setup>
const tabLabels = ['Add Product', 'Edit Products', 'Add Category'];
const activeTab = ref(tabLabels[1])

definePageMeta({
    layout: 'admin'
})
</script> 

<template>
    <div class="flex flex-col items-center h-screen overflow-y-auto">
        <div class="h-14">
            <div class="h-14 fixed top-0 pt-2 pb-0 left-1/2 -translate-x-1/2 border w-screen bg-white">
                <Tabs defaultTab="Edit Products" @change="(tab) => activeTab = tab" :tabLabels="tabLabels" />
            </div>
        </div>

        <div class="px-3 sm:px-5 md:px-6 pt-16 pb-4 flex-1">
            <AdminAddProductForm v-if="activeTab === 'Add Product'" />
            <ProductListEditable v-else-if="activeTab === 'Edit Products'" />
        </div>
    </div>
</template>