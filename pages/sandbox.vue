<script lang="ts" setup>

const loading = ref(false);
const formValues = ref({ title: '' })
</script>

<template>
    <Page>
        <!-- <PageTitle>Admin</PageTitle> -->

        <div class="flex justify-center px-3 sm:px-5 md:px-6 h-full">
            <!-- @submit="handleSubmit" -->
            <FormKit type="form" v-model="formValues" :actions="false">
                <div class="flex justify-center">
                    <div class="flex flex-col items-center space-y-6">
                        <!-- :disabled="loading" -->
                        <FormKit name="title" type="text" />
                        <FormKit :loading="loading" type="submit" />

                    </div>

                </div>
            </FormKit>
        </div>
    </Page>
</template>