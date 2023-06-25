<script lang="ts" setup>
import { useAdminStore } from '~~/store/adminStore';
import type { DeleteRes } from '~~/store/adminStore';
import { toTitleCase } from '~~/utils/helpers'
import type { Category } from '~~/utils/types';

const store = useAdminStore();

onBeforeMount(() => {
    if (!store.categories.data?.length) store.getCategories();
})

const categories = computed(() => store.categories.data.map((cat: Category) => {
    return { ...cat, title: toTitleCase(cat.title) };
}));

const productToDelete = ref({ id: -1, idx: -1 });
const handleClickDelete = (id: number, idx: number) => {
    showConfirmModal.value = true;
    productToDelete.value = { id, idx }
}

const handleClickCancelEdit = () => {
    editing.id = null;
    editing.title = null;
    initialEditVal.value = '';
}

type EditInfo = { id: null | number, title: null | string }
const editing: EditInfo = reactive({ id: null, title: null })
const initialEditVal = ref(''); // holds original category title.  No update will happen if initialEditVal === 'new' saved value.
const showErrorToast = ref(false);
const errorMsg = ref('');

const handleClickEdit = (id: number, title: string) => {
    editing.id = id;
    editing.title = title;
    initialEditVal.value = title;
}

const showError = (msg = "Something went wrong", dur = 6000) => {
    errorMsg.value = msg;
    showErrorToast.value = true;
    setTimeout(() => {
        showErrorToast.value = false;
        errorMsg.value = '';
    }, dur)
}

const saving = ref<number | null>(null);
const handleClickSave = async () => {
    if (!editing.id || !editing.title) return;

    if (editing.title !== initialEditVal.value) {
        try {
            saving.value = editing.id;
            const res = await useCustomFetch(`/category/${editing.id}`, {
                method: 'PATCH',
                body: { title: editing.title },
            })
            console.log('SAVE RES:', res);
            store.updateCategory(editing.id, editing.title);
        } catch (e) {
            console.log('Failed to save edited category')
            showError();
        }
    }

    saving.value = null;
    editing.id = null;
    editing.title = null;
    initialEditVal.value = '';
}

const showConfirmModal = ref(false);
const deleteCategory = async () => {
    const id = productToDelete.value.id;
    const idx = productToDelete.value.idx;
    if (!id || typeof idx !== "number") return;

    try {
        showConfirmModal.value = false;
        store.deleting = store.categoryToDelete;
        const res = await useCustomFetch(`/category/${id}`, {
            method: "DELETE",
        });
        const deleteRes = res.data.value as DeleteRes;
        console.log("deleteRes:", res);
        if (!deleteRes || !deleteRes.affected) {
            console.log('1:', res.error.value);
            console.log('2:', res.error.value?.data);
            if (res.error.value?.data.detail.includes('referenced')) {
                showError(
                    'There are product(s) referencing this category that must be given a different category or deleted', 12000
                )
                return;
            }
            if (deleteRes?.message) throw deleteRes.message;
            else throw "Failed";
        }

        // copy categories, and delete from the copy
        const curCategories = [...store.categories.data];
        curCategories.splice(idx, 1);

        store.categoryToDelete = null;
        store.categories.data = curCategories;
        store.deleting = null;
    } catch (e) {
        showError()
        console.error(e);
        store.deleting = null;
        return false;
    }
}

const flexCenter = " flex justify-center items-center"
const iconBtnClasses = "transition-colors duration-300 z-10 rounded-full border p-1"
const trashBtnClasses = "bg-red-100 hover:bg-red-200 active:bg-red-300 h-7 w-7 " + iconBtnClasses
const editBtnClasses = "bg-gray-50 hover:bg-gray-100 active:bg-gray-200 h-7 w-7 " + iconBtnClasses;
const saveBtnClasses = "bg-gray-50 hover:bg-gray-100 active:bg-gray-200 h-11 w-11 " + iconBtnClasses + flexCenter;
</script>

<template>
    <div class="w-full">
        <Toast :error="true" :visible="showErrorToast">{{ errorMsg }}</Toast>

        <h3 class="font-semibold text-xl mb-3">All Categories</h3>

        <div v-if="categories.length" v-for="category, i in categories" class="mb-1">
            <div class="flex space-x-2 items-center h-12">
                <div class="pr-4 space-x-2 min-w-max">
                    <button :disabled="!!editing.id" :class="trashBtnClasses" @click="handleClickDelete(category.id, i)">
                        <img v-if="store.deleting && store.deleting.id === category.id" class="animate-spin"
                            src="/icons/loading.svg" />
                        <img v-else class="scale-90" src="/icons/trash.svg" />
                    </button>

                    <button :disabled="!!editing.id" :class="editBtnClasses"
                        @click="handleClickEdit(category.id, category.title)">
                        <img class="scale-90" src="/icons/edit.svg" />
                    </button>
                </div>

                <p v-if="!editing.id || editing.id !== category.id" class="font-medium">{{ category.title }}</p>
                <div v-else class="flex space-x-2 items-center pt-1">
                    <div class="w-max">
                        <FormKit type="text" v-model="editing.title" />
                    </div>

                    <button :disabled="initialEditVal === editing.title" :class="saveBtnClasses" @click="handleClickSave">
                        <img v-if="!saving || saving !== category.id" class="scale-90" src="/icons/save.svg" />
                        <img v-else class="animate-spin" src="/icons/loading.svg" />
                    </button>

                    <button :class="saveBtnClasses" @click="handleClickCancelEdit">
                        <img class="scale-90" src="/icons/close.svg" />
                    </button>
                </div>
            </div>
        </div>

        <ModalConfirm :isOpen="true" v-if="showConfirmModal" @confirm="deleteCategory" @cancel="store.closeConfirmModal" />
    </div>
</template>