<script lang="ts" setup>
import { useAdminStore } from '~~/store/adminStore';

const store = useAdminStore();

onBeforeMount(() => {
    if (!store.categories.data?.length) store.getCategories();
})

const categories = computed(() => {
    return store.categories.data;
})

const handleClickDelete = (id: number, idx: number) => {
    console.log('Delete clicked')
    store.openConfirmModal('category', { id, idx })
}

const iconBtnClasses = "transition-colors duration-300 z-10 h-7 w-7 rounded-full border p-1"
const trashBtnClasses = "bg-red-100 hover:bg-red-200 active:bg-red-300 " + iconBtnClasses
const editBtnClasses = "bg-gray-50 hover:bg-gray-100 active:bg-gray-200" + iconBtnClasses;
</script>

<template>
    <div class="w-full">
        <h3 class="font-semibold text-xl mb-3">All Categories</h3>

        <div v-if="categories.length" v-for="category, i in categories" class="mb-1">
            <div class="flex space-x-2 items-center">
                <div class="pr-4 space-x-2">
                    <button :class="trashBtnClasses" @click="handleClickDelete(category.id, i)">
                        <img v-if="store.deleting && store.deleting.id === category.id" class="animate-spin"
                            src="/icons/loading.svg" />
                        <img v-else class="scale-90" src="/icons/trash.svg" />
                    </button>

                    <button :class="editBtnClasses" @click="handleClickDelete(category.id, i)">
                        <img v-if="store.deleting && store.deleting.id === category.id" class="animate-spin"
                            src="/icons/loading.svg" />
                        <img v-else class="scale-90" src="/icons/edit.svg" />
                    </button>
                </div>

                <p class="font-medium">{{ category.title }}</p>
            </div>
        </div>

        <ModalConfirm />
    </div>
</template>