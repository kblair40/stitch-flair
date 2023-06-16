<script lang='ts' setup>
const tabLabels = ['Add Product', 'Manage Products', 'Manage Categories', 'Manage Promos'];
const activeTab = ref(tabLabels[3])

definePageMeta({
    layout: 'admin'
})

const categoryClasses = [
    // "border border-red-300",
    "flex flex-col items-center",
    // "w-full pt-6 md:space-x-6 lg:px-4 xl:px-8"
]
</script> 

<template>
    <div class="flex flex-col items-center h-screen overflow-y-auto">
        <div class="tabs-container border border-red-200">
            <div class="tabs-container fixed top-0 pt-2 pb-0 left-1/2 -translate-x-1/2 border w-screen bg-white">
                <Tabs defaultTab="Manage Promos" @change="(tab: string) => activeTab = tab" :tabLabels="tabLabels" />
            </div>
        </div>

        <div class="page-container flex-1 w-screen">
            <div class="px-3 sm:px-5 md:px-6 w-full h-full max-h-full overflow-y-auto">
                <AdminAddProductForm v-if="activeTab === 'Add Product'" />
                <ProductListEditable v-else-if="activeTab === 'Manage Products'" />
                <div :class="categoryClasses" v-else-if="activeTab === 'Manage Categories'">
                    <div class="w-full max-w-75 sm:max-w-120 md:max-w-150 mt-6">
                        <AdminEditCategoryList />
                        <div class="mt-10 w-full">
                            <p class="text-lg font-semibold mb-2">Add Category</p>
                            <AdminAddCategoryForm />
                        </div>
                    </div>
                </div>
                <AdminManagePromotions v-else-if="activeTab === 'Manage Promos'" />
            </div>
        </div>
    </div>
</template>

<style lang="css" scoped>
.tabs-container {
    height: 56px;
}

.page-container {
    height: calc(100vh - 56px);
}
</style>