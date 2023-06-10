<script lang="ts" setup>
import { useAdminStore } from '~~/store/adminStore';

const store = useAdminStore();

onBeforeMount(() => {
    if (!store.categories.data?.length) store.getCategories();
})

const categories = computed(() => {
    return store.categories.data;
})
</script>

<template>
    <div class="border w-full">
        <h3 class="font-semibold text-xl">All Categories</h3>
        <div v-if="categories.length" v-for="category in categories">
            <div class="flex space-x-2">
                <p class="font-medium">Category Title:</p>
                <p>{{ category.title }}</p>
            </div>
        </div>
    </div>
</template>