<script lang="ts" setup>
import { useAdminStore } from '~~/store/adminStore';

interface Props {
    name: string;
    image_url: string;
    price: string;
    id: number;
    idx: number;
}
const props = defineProps<Props>();

const store = useAdminStore();

const cardClasses = [
    'z-10 p-2 bg-white relative',
    "min-w-75 w-75 max-w-75",
    "cursor-pointer group rounded-md",
]
const imgWrapperClasses = "overflow-hidden w-full h-auto sm:h-56 lg:h-64";
const imgClasses = [
    "object-cover h-full rounded-sm",
    "group-hover:scale-105",
    "transition-transform duration-300"
]
const iconBtnClasses = "transition-colors duration-300 z-10 rounded-full h-7 w-7 flex justify-center items-center"
const deleteBtnClasses = "bg-red-100 hover:bg-red-200 active:bg-red-300 " + iconBtnClasses;
const editBtnClasses = "bg-white hover:bg-slate-100 active:bg-slate-200 " + iconBtnClasses;

const handleClickDelete = () => {
    store.openConfirmModal('product', { id: props.id, idx: props.idx });
}
const handleClickEdit = () => {
    store.openEditProductModal({ id: props.id, idx: props.idx })
    console.log('Edit clicked')
}
</script>

<template>
    <div :class="cardClasses">
        <div class="flex space-x-2 absolute top-1 right-1 p-1">
            <button :class="editBtnClasses" @click="handleClickEdit">
                <!-- <img class="animate-spin" src="/icons/loading.svg" /> -->
                <img class="scale-75" src="/icons/edit.svg" />
                <!-- <img v-if="store.deleting && store.deleting.id === id" class="animate-spin" src="/icons/loading.svg" />
                <img v-else class="scale-75" src="/icons/edit.svg" /> -->
            </button>

            <button :class="deleteBtnClasses" @click="handleClickDelete">
                <img v-if="store.deleting && store.deleting.id === id" class="animate-spin" src="/icons/loading.svg" />
                <img v-else class="w-4 h-4" src="/icons/trash.svg" />
            </button>
        </div>

        <div :class="imgWrapperClasses">
            <img :src="image_url" :class="imgClasses" />
        </div>

        <p class="font-medium mt-2">{{ name }}</p>
        <p class="font-semibold mt-1">{{ price }}</p>
    </div>
</template>