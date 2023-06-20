<script setup lang="ts">
import type { TextContent } from '~~/utils/types';

const showErrorToast = ref(false);
const errorMsg = ref('Something went wrong');

const handleError = (msg?: string) => {
    showErrorToast.value = true;
    if (msg) errorMsg.value = msg;
    setTimeout(() => {
        showErrorToast.value = false
        errorMsg.value = "Something went wrong"
    }, 8000); // 8s
}

const initialContent = ref({ header: '', body: '' });
const homeContent = ref({ header: '', body: '' });

const { data: text, error } = await useCustomFetch<TextContent>('/text');
console.log('Text/Error:', { text: toRaw(text.value), error: toRaw(error.value) });
if (error.value) handleError();
else {
    let content = toRaw(text.value);
    if (content && content.homeTitle && content.homeText) {
        homeContent.value = { header: content.homeTitle, body: content.homeText }
        initialContent.value = { header: content.homeTitle, body: content.homeText }
    } else {
        handleError('Header or Body text is missing');
    }
}

</script>

<template>
    <div class="flex flex-col items-center">
        <Toast :error="true" :visible="showErrorToast">{{ errorMsg }}</Toast>

        <div class="w-full max-w-75 sm:max-w-120 md:max-w-150 mt-6">
            <div class="w-full mb-20">
                <h3 class="font-semibold text-xl mb-3">Home Page</h3>

                <FormKit type="text" :actions="false" label="Header" />
            </div>
        </div>
    </div>
</template>