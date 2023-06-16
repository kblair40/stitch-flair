<script lang="ts" setup>
withDefaults(defineProps<{ text: string; color?: string }>(), {
    text: '',
    color: 'green',
})


</script>

<template>
    <div class="w-10 h-6 rounded-full">{{ text }}</div>
</template>