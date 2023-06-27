<script lang="ts" setup>

const loading = ref(false);
const formValues = ref({ title: '' })

const handleSubmit = () => {
    loading.value = true;
    setTimeout(() => loading.value = false, 2000);
}

const bgClasses = 'bg-lightpeach-50 hover:bg-lightpeach-100 active:bg-lightpeach-200';
const colorClasses = [bgClasses, 'border border-whitepeach-300 transition-colors duration-300'].join(' ')

const inputClasses = [
    // 'py-2 px-6',
    '$reset rounded-md',
    colorClasses, 
].join(' ');
const outerClasses = [
    '$reset',
].join(' ')
const labelClasses = [
    '$reset font-medium',
].join(' ')
const prefixClasses = [
    'border border-slate-100'
].join('')

const buttonClasses = {
    outer: outerClasses,
    wrapper: '$reset',
    input: inputClasses,
    // prefixIcon > prefix > label > suffix > suffixIcon
    label: labelClasses,
    prefix: prefixClasses
}
</script>

<template>
    <Page>
        <!-- <PageTitle>Admin</PageTitle> -->

        <div class="flex justify-center px-3 sm:px-5 md:px-6 h-full">
            <!-- @submit="handleSubmit" -->
            <FormKit type="form" v-model="formValues" :actions="false" @submit="handleSubmit">
                <div class="flex justify-center">
                    <div class="flex flex-col items-center space-y-6">
                        <!-- :disabled="loading" -->
                        <FormKit name="title" type="text" />
                        <FormKit :loading="loading" type="submit" :classes="buttonClasses" />

                    </div>

                </div>
            </FormKit>
        </div>
    </Page>
</template>