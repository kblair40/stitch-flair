<script lang="ts" setup>
// import loadingIcon from '/icons/loading.svg'
// import { loadingIcon } from '~/assets/icons/loading.svg'

interface Props {
    loading: boolean;
    label: string;
}

withDefaults(defineProps<Props>(), {
    loading: false,
    label: 'Submit'
})  
</script>

<template>
    <FormKit type="submit">
        <div class="flex justify-center items-center">
            <span v-if="!loading">{{ label }}</span>
            <div v-else>
                <img class="w-6 h-6 animate-spin" src="/icons/loading.svg" />
            </div>
        </div>
    </FormKit>
</template>