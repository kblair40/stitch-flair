<script lang="ts" setup>

const loading = ref(false);
const formValues = ref({ title: '' })

const handleSubmit = () => {
    loading.value = true;
    console.log('Loading', loading.value)
    setTimeout(() => {
        loading.value = false
        console.warn('Loading', loading.value)
    }, 2000);
}

const bgClasses = 'bg-lightpeach-300 hover:bg-lightpeach-400 active:bg-lightpeach-500';
const colorClasses = [bgClasses, 'border border-whitepeach-300 transition-colors duration-300'].join(' ')

const outerClasses = [
    '$reset',
    'border border-white'
].join(' ')
const wrapperClasses = [
    '$reset border border-slate-300'
].join(' ')
const inputClasses = [
    '$reset rounded-md font-semibold',
    'py-2 px-6',
    colorClasses,
].join(' ');
const labelClasses = [
    '$reset',
    'border border-red-500'
].join(' ')

// prefixIcon: "$reset block w-4 -ml-2 mr-2 stretch",
// suffixIcon: "$reset block w-4 ml-2 stretch",
const prefixIconClasses = [
    '$reset',
    "border border-slate-200",
    // 'w-4 h-4'
    "block w-4 -ml-2 mr-2 stretch"
].join('')
const suffixIconClasses = [
    "$reset block w-4 -ml-2 mr-2 stretch",
].join(' ')

const buttonClasses = {
    outer: outerClasses,
    wrapper: wrapperClasses,
    input: inputClasses,
    // prefixIcon > prefix > label > suffix > suffixIcon
    label: labelClasses,
    prefixIcon: prefixIconClasses,
    suffixIcon: suffixIconClasses
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