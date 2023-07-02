<script lang='ts' setup>
import ManageCategories from '~~/components/Admin/ManageCategories.vue';

definePageMeta({ layout: 'admin' });

const tabLabels = ['Add Product', 'Manage Products', 'Manage Categories', 'Manage Promos', 'Manage Text Content'];
const activeTab = ref(tabLabels[3])
</script> 

<template>
    <div class="flex flex-col items-center h-screen overflow-y-auto">
        <div class="tabs-container border border-red-200">
            <div class="tabs-container overflow-x-auto fixed top-0 left-1/2 -translate-x-1/2 border w-screen bg-white">
                <Tabs defaultTab="Manage Promos" @change="(tab: string) => activeTab = tab" :tabLabels="tabLabels" />
            </div>
        </div>

        <div class="page-container flex-1 w-screen">
            <div class="px-3 sm:px-5 md:px-6 w-full h-full max-h-full overflow-y-auto">
                <AdminAddProductForm v-if="activeTab === 'Add Product'" />
                <ProductListEditable v-else-if="activeTab === 'Manage Products'" />
                <ManageCategories v-else-if="activeTab === 'Manage Categories'" />
                <!-- <div class="flex justify-center" v-else-if="activeTab === 'Manage Categories'"> -->
                <!-- <div class="w-full max-w-75 sm:max-w-120 md:max-w-150 mt-6"> -->
                <!-- <div class="flex flex-col md:flex-row lg:px-6 border w-full mt-6">
                        <AdminEditCategoryList />
                        <div class="mt-10 w-full">
                            <p class="text-lg font-semibold mb-2">Add Category</p>
                            <AdminAddCategoryForm />
                        </div>
                    </div> -->
                <!-- </div> -->
                <AdminManagePromotions v-else-if="activeTab === 'Manage Promos'" />
                <AdminManageTextContent v-else-if="activeTab === 'Manage Text Content'" />
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