<script lang="ts" setup>
import { useAdminStore } from '~~/store/adminStore';
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
const handleClickCancelDelete = () => {
    showConfirmModal.value = false;
    productToDelete.value = { id: -1, idx: -1 }
}

type EditInfo = { id: null | number, title: null | string }
const editing: EditInfo = reactive({ id: null, title: null })
const initialEditVal = ref(''); // holds original category title.  No update will happen if initialEditVal === 'new' saved value.
const showErrorToast = ref(false);
const errorMsg = ref('');
const showSuccessToast = ref(false);
const successMsg = ref('');
const deleting = ref<number | null>(null);

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
const showSuccess = (msg = "Category updated", dur = 6000) => {
    successMsg.value = msg;
    showSuccessToast.value = true;
    setTimeout(() => {
        successMsg.value = '';
        showSuccessToast.value = false;;
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
            console.log('Save Res:', res);
            if (res.data.value) {
                store.updateCategory(editing.id, editing.title);
                showSuccess()
            }
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
    const { id, idx } = productToDelete.value;

    if (!id || typeof idx !== "number") return;

    try {
        showConfirmModal.value = false;
        // store.deleting = store.categoryToDelete;
        deleting.value = id;
        const res = await useCustomFetch(`/category/${id}`, {
            method: "DELETE",
        });

        console.log("Delete Res:", res);
        if (res.error.value?.data.detail.includes('referenced')) {
            showError(
                'There are product(s) referencing this category that must be given a different category or deleted', 12000
            )
            return;
        } else if (res.error.value) {
            showError();
            return;
        }

        if (res.data.value) {
            showSuccess('Category deleted');
            // console.log('\nREMOVING', id)
            store.removeCategory(id);
        }
    } catch (e) {
        showError()
        console.error(e);
        store.deleting = null;
        return false;
    }
}

</script>

<template>
    <div class="w-full">
        <Toast :error="true" :visible="showErrorToast">{{ errorMsg }}</Toast>
        <Toast :visible="showSuccessToast">{{ successMsg }}</Toast>

        <h3 class="font-semibold text-xl mb-3">All Categories</h3>

        <div v-if="categories.length" v-for="category, i in categories" class="mb-1">
            <div class="flex space-x-2 items-center h-12">
                <div class="pr-4 space-x-2 min-w-max flex">
                    <IconButton :disabled="!!editing.id" icon="trash" size="sm"
                        :loading="!!store.deleting && store.deleting.id === category.id"
                        @click="handleClickDelete(category.id, i)" />

                    <IconButton :disabled="!!editing.id" icon="edit" size="sm"
                        @click="handleClickEdit(category.id, category.title)" />
                </div>

                <p v-if="!editing.id || editing.id !== category.id" class="font-medium">{{ category.title }}</p>
                <div v-else class="flex space-x-2 items-center pt-1">
                    <div class="w-max">
                        <FormKit type="text" v-model="editing.title" />
                    </div>

                    <IconButton icon="save" :disabled="initialEditVal === editing.title"
                        :loading="!!saving && saving === editing.id" size="lg" @click="handleClickSave" />

                    <IconButton icon="close" size="lg" @click="handleClickCancelEdit" />
                </div>
            </div>
        </div>

        <ModalConfirm :isOpen="true" v-if="showConfirmModal" @confirm="deleteCategory" @cancel="handleClickCancelDelete" />
    </div>
</template>