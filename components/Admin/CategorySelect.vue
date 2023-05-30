<script lang="ts" setup>
import { watch } from 'vue';
import axios from 'axios';


const baseURL = 'http://localhost:3001';
const { data, pending, error } = useFetch('/category', { baseURL });

watch(data, (newVal, oldVal) => {
    console.log('data changed:', { newVal, oldVal });
})
watch(pending, (newVal, oldVal) => {
    console.log('pending changed:', { newVal, oldVal });
})
</script>

<template>
    <select>

    </select>
</template>