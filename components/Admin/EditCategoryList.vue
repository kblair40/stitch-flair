<script lang="ts" setup>
import { useAdminStore } from '~~/store/adminStore';

const store = useAdminStore();

onBeforeMount(() => {
    if (!store.categories.data?.length) store.getCategories();
})

const categories = computed(() => {
    return store.categories.data;
})

const handleClickDelete = (id: number) => {
    console.log('Delete clicked')
}

const iconBtnClasses = [
    "transition-colors duration-300 bg-red-100 z-10",
    "hover:bg-red-200 active:bg-red-300 rounded-full absolute top-1 right-1 border p-1",
]
</script>

<template>
    <div class="border w-full">
        <h3 class="font-semibold text-xl">All Categories</h3>
        <div v-if="categories.length" v-for="category in categories">
            <div class="flex space-x-2">
                <p class="font-medium">Category Title:</p>
                <p>{{ category.title }}</p>

                <button :class="iconBtnClasses" @click="handleClickDelete(category.id)">
                    <img v-if="store.deleting && store.deleting.id === category.id" class="animate-spin" src="/icons/loading.svg" />
                    <img v-else class="scale-75" src="/icons/trash.svg" />
                </button>
            </div>
        </div>
    </div>
</template>