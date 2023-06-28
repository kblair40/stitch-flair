<script lang="ts" setup>
import { useAdminStore } from '~~/store/adminStore';
import type { Product, Category } from '~/utils/types'
import { toTitleCase } from '~~/utils/helpers';

const store = useAdminStore();
store.getProducts();
store.getCategories();
store.getPromotions();

const deletedProductIds = ref<number[]>([])
const featuredOnly = ref(false);

const productList = computed(() => {
    const products = store.categoryProducts.filter(prod => {
        return !deletedProductIds.value.includes(prod.id);
    })
    if (products && Array.isArray(products) && products.length) {
        // console.log('Products:', products);
        const prodList = products.map((product: Product, i: number) => ({
            ...product,
            idx: i
        }))

        return featuredOnly.value
            ? prodList.filter(p => p.featured)
            : prodList
    }

    return [];
})

const categoryOptions = computed(() => {
    const { data: categories } = store.categories;
    if (categories && Array.isArray(categories) && categories.length) {
        // console.log('Categories:', categories);
        return categories.map((category: Category) => ({
            label: toTitleCase(category.title),
            value: category.id,
        }))
    }

    return [];
})

const showErrorToast = ref(false);
const errorMsg = ref('');
const handleShowError = (msg: string) => {
    console.log('msg received by product list:', msg);
    errorMsg.value = msg;
    showErrorToast.value = true;
    setTimeout(() => {
        showErrorToast.value = false;
        errorMsg.value = '';
    }, 6000);
}

const showSuccessToast = ref(false);
const handleEditSuccess = () => {
    showSuccessToast.value = true;
    setTimeout(() => showSuccessToast.value = false, 3000);
}

const handleDeleteProduct = async () => {
    const deleteRes = await store.deleteProduct();
    if (deleteRes && store.productToDelete) {
        deletedProductIds.value.push(store.productToDelete.id);
        store.productToDelete = null;
    }
}

const handleClose = (success?: boolean) => {
    // Show success/error toast here
    console.log('\nSuccess:', success);
    if (success) handleEditSuccess();
    store.closeEditProductModal();
}

const gridClasses = computed(() => {
    return [
        // 'border',
        'flex flex-col items-center space-y-4 md:space-y-0',
        'md:grid md:grid-cols-2 md:gap-3 md:grid-flow-row',
        'lg:grid-cols-3 lg:gap-5',
    ]
})
</script>

<template>
    <div class="relative h-full pt-4">
        <Toast :error="true" :visible="showErrorToast">{{ errorMsg }}</Toast>
        <Toast :visible="showSuccessToast">Updated</Toast>

        <div class="flex justify-center h-18 mb-4">
            <div class="mr-8">
                <!-- wrapper-class="$reset flex flex-row-reverse border border-red-300" -->
                <!-- input-class="ml-2 flex" -->
                <FormKit 
                    type="checkbox" 
                    v-model="featuredOnly"
                    label="Featured Only"
                />
            </div>
            <div class="w-52 min-w-min">
                <FormKit :disabled="store.products.loading" type="select" label="Category"
                    :options="[{ label: 'Any', value: null }, ...categoryOptions]" v-model="store.category" />
            </div>
        </div>

        <div class="flex justify-center z-0">
            <div v-if="store.products.loading">
                <img class="animate-spin scale-200" src="/icons/loading.svg" />
            </div>

            <div :class="gridClasses" v-else-if="productList.length">
                <ProductListItemEditable v-for="product in productList" v-bind="product" :preview="true" />
            </div>

            <div v-else-if="!productList.length">
                <p class="text-center font-medium tracking-wide text-lg">NO PRODUCTS</p>
            </div>
        </div>

        <ModalConfirm v-if="store.showConfirmModal" @confirm="handleDeleteProduct" @cancel="store.closeConfirmModal" />
        <AdminEditProductModal @success="handleClose(true)" @error="handleShowError" @close="handleClose"
            v-if="store.showEditProductModal" />
    </div>
</template>