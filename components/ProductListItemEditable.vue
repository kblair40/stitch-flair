<script lang="ts" setup>
import { useAdminStore } from '~~/store/adminStore';
import type { PromoColor } from '~~/utils/types';

interface Props {
    price: string;
    image_url: string;
    name: string;
    category_id: number;
    description?: string;
    featured: boolean;
    on_sale: boolean;
    on_sale_price?: null | string;
    etsy_url?: string;
    promos?: { text: string; color: PromoColor }[];
    preview?: boolean;
    id: number;
    idx: number;
}
const props = defineProps<Props>();

const store = useAdminStore();

const handleClickDelete = () => {
    store.openConfirmModal('product', { id: props.id as number, idx: props.idx as number });
}
const handleClickEdit = () => {
    const info = { id: props.id as number, idx: props.idx as number }
    // console.log('\nEdit clicked - props:', info);
    store.openEditProductModal(info)
}
</script>

<template>
    <ProductCard v-bind="props">
        <div class="flex space-x-2 absolute top-2 right-2 p-1">
            <IconButton  
                icon="edit"
                size="sm"
                @click="handleClickEdit"
            />
            <IconButton  
                icon="trash"
                size="sm"
                :loading="!!store.deleting && store.deleting.id === id"
                @click="handleClickDelete"
            />
        </div>

        <div v-if="props.featured" class="absolute top-2 left-3">
            &#9733;
        </div>
    </ProductCard>
</template>