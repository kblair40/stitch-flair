<script lang="ts" setup>

// @PrimaryGeneratedColumn()
// id: number;
// @Column({ unique: true })
// title: string;
// @OneToMany(() => Product, (product) => product.category)
// products: Product[];

defineEmits(['submit'])

const baseURL = 'http://localhost:3001';
const { data: categoryData, pending, error } = useFetch<{ id: string, title: string }[]>('/category', { baseURL });

const showSuccessToast = ref(false);

const title = ref('');
const handleSubmit = async () => {
    console.log('Category Title:', title)
    try {
        if (!title.value) return;
        const res = await useCustomFetch('/category', {
            method: 'POST',
            body: { title },
        })
        console.log('Create Category Res:', res.data, '\n');
        showSuccessToast.value = true;
        console.log('Show Succes Toast Value:', showSuccessToast.value)

        setTimeout(() => {
            showSuccessToast.value = false;
            console.log('Show Succes Toast Value:', showSuccessToast.value)
        }, 3000)

    } catch (e) {
        console.log('Failed to create product:', e)
    }
}

const formClasses = [
    "w-full flex flex-col space-y-4 items-end",
    "sm:flex-row sm:space-x-4 sm:space-y-0"
]
</script>

<template>
        <div>
            <Toast :visible="showSuccessToast">Saved Category</Toast>

            <div :class="formClasses">
                <div class="w-full">
                    <FormKit v-model="title" label="Category Title" type="text" validation="required:trim|length:1,32" />
                </div>

                <div class="w-full sm:w-40">
                    <FormKit @click="handleSubmit" type="submit">Save</FormKit>
                </div>
            </div>
        </div>
</template>