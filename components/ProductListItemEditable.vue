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
const iconBtnClasses = "transition-colors duration-300 z-10 rounded-full h-7 w-7 flex justify-center items-center"
const deleteBtnClasses = "bg-red-100 hover:bg-red-200 active:bg-red-300 " + iconBtnClasses;
const editBtnClasses = "bg-white hover:bg-slate-100 active:bg-slate-200 " + iconBtnClasses;

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
            <button :class="editBtnClasses" @click="handleClickEdit">
                <img class="scale-75" src="/icons/edit.svg" />
            </button>

            <button :class="deleteBtnClasses" @click="handleClickDelete">
                <img v-if="store.deleting && store.deleting.id === id" class="animate-spin" src="/icons/loading.svg" />
                <img v-else class="w-4 h-4" src="/icons/trash.svg" />
            </button>
        </div>

        <div v-if="props.featured" class="absolute top-2 left-3">
            &#9733;
        </div>
    </ProductCard>
</template>