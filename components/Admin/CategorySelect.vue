<script lang="ts" setup>
const emit = defineEmits(['change']);

const baseURL = 'http://localhost:3001';
const { data, pending, error } = useFetch<{ id: string, title: string }[]>('/category', { baseURL });

const inputClasses = [
    'h-10 w-full rounded-md focus-visible:outline-none px-3 transition-colors',
    'border border-whitepeach hover:border-whitepeach-500 focus:border-whitepeach-700'
]

const handleChange = ({ target }: any) => {
    console.log('VAL:', target.value, typeof target);
    emit('change', target.value);
}
</script>

<template>
    <select @change="handleChange" :class="inputClasses">
        <option v-if="data" v-for="option in data" :value="option.id">{{ option.title }}</option>
    </select>
</template>