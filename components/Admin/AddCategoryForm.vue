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
        }, 6000)

    } catch (e) {
        console.log('Failed to create product:', e)
    }
}

const categoryOptions = computed(() => {
    if (categoryData.value) {
        return categoryData.value.map(option => {
            return { label: option.title, value: option.id }
        })
    }
    return [];
})

const formWrapperClasses = [
    // "border border-red-300",
    "flex flex-col items-center md:flex-row md:items-start md:justify-center",
    "w-full pt-6 md:space-x-6 lg:px-4 xl:px-8"
]
const formClasses = [
    "w-full max-w-75",
    "flex flex-col space-y-4 items-end",
    "sm:flex-row sm:space-x-4 sm:space-y-0 sm:max-w-120 md:max-w-150"
]
</script>

<template>
        <div :class="formWrapperClasses">
            <Toast :visible="showSuccessToast">Saved Category</Toast>

            <div :class="formClasses">
                <FormKit v-model="title" label="Category Title" type="text" validation="required:trim|length:1,32" />

                <div class="w-full sm:w-40">
                    <FormKit @click="handleSubmit" type="submit">Save</FormKit>
                </div>
            </div>
        </div>
</template>