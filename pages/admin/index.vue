<script lang='ts' setup>
const tabLabels = ['Add Product', 'Edit Product', 'Add Category'];
const activeTab = ref(tabLabels[0])
</script>

<template>
    <Page>
        <!-- <PageTitle>Admin</PageTitle> -->
        <div class="fixed top-44 sm:top-56 md:top-68 left-1/2 -translate-x-1/2">
            <Tabs @change="(tab) => activeTab = tab" :tabLabels="tabLabels" />
        </div>

        <div class="flex flex-col items-center px-3 sm:px-5 md:px-6 mt-12 flex-1">
            <AdminAddProductForm v-if="activeTab === 'Add Product'" />
        </div>
    </Page>
</template>