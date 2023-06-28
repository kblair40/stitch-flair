<script lang="ts" setup>

const loading = ref(false);
const formValues = ref({ title: '' })

const handleSubmit = (formValues: any) => {
    console.log('Form Values;', formValues);
    loading.value = true;
    console.log('\n\n\nLoading', loading.value)
    setTimeout(() => {
        loading.value = false
        console.log('Loading', loading.value)
    }, 2000);
}

const inputFocusVisibleClasses = 'focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2';

`




 
`
const flexClasses = 'inline-flex items-center'
const loadingClasses = [
    'formkit-disabled:bg-gray-400 formkit-loading:before:border',
    'formkit-loading:before:border-2 formkit-loading:before:border-r-transparent formkit-loading:before:border-white',
    'formkit-loading:before:w-4 formkit-loading:before:h-4',
    'formkit-loading:before:mr-2 formkit-loading:before:rounded-3xl',
    'formkit-loading:before:animate-spin'
]

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
    '$reset font-semibold',
    'py-2 px-6 rounded',
    flexClasses,
    loadingClasses,
    colorClasses,
].join(' ');
const labelClasses = [
    '$reset block',
    'border border-red-500'
].join(' ')

// prefixIcon: "$reset block w-4 -ml-2 mr-2 stretch",
// suffixIcon: "$reset block w-4 ml-2 stretch",
const prefixIconClasses = [
    '$reset',
    // "border border-slate-200",
    // 'w-4 h-4'
    "block w-4 -ml-2 mr-2 stretch"
].join('')
const suffixIconClasses = [
    "$reset block w-4 ml-2 stretch",
].join(' ')

const buttonClasses = ref({
    outer: outerClasses,
    wrapper: wrapperClasses,
    input: inputClasses,
    // prefixIcon > prefix > label > suffix > suffixIcon
    label: labelClasses,
    prefixIcon: prefixIconClasses,
    suffixIcon: suffixIconClasses
})

console.log('BUTTON CLASSES:', buttonClasses.value)
</script>

<template>
    <Page>
        <button @click="handleSubmit"
            class="absolute bottom-80 left-1/2 -translate-x-1/2 border px-4 py-2 rounded-sm bg-white">
            dummy submit
        </button>
        <div class="flex justify-center">
            <div class="max-w-75">
                <FormButtonSubmit label="Submit" :loading="loading" />
            </div>
        </div>
    </Page>
</template>