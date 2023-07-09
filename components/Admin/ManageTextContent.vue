<script setup lang="ts">
import { FormKitMessages } from '@formkit/vue'

import type { TextContent } from '~~/utils/types';

const loading = ref(false);
const showErrorToast = ref(false);
const showSuccessToast = ref(false);
const errorMsg = ref('Something went wrong');
const formRef = ref<HTMLFormElement | null>(null);
const initialContent = ref({ header: '', body: '' });
const homeContent = ref({ header: '', body: '' });


const handleError = (msg?: string, duration = 8000) => {
    if (msg) errorMsg.value = msg;
    showErrorToast.value = true;
    setTimeout(() => {
        showErrorToast.value = false
        errorMsg.value = "Something went wrong"
    }, duration);
}

const handleSubmit = async () => {
    const start = initialContent.value;
    const end = homeContent.value;
    console.log('Start/End', { start, end })

    const body: { [key: string]: string } = {};
    if (start.header.trim() !== end.header.trim()) {
        body['homeTitle'] = end.header;
    }
    if (start.body.trim() !== end.body.trim()) {
        body['homeText'] = end.body;
    }

    if (!Object.keys(body).length) {
        console.log('No changes made');
        handleError("No changes were made", 3000);
        return;
    }

    try {
        const { data, error } = await useCustomFetch('/text/1', { method: 'PATCH', body });
        console.log('\nPATCH RES:', { data, error });

        if (error.value) {
            handleError();
        } else {
            initialContent.value = homeContent.value;
            showSuccessToast.value = true;
            setTimeout(() => showSuccessToast.value = false, 3000)
        }

    } catch (e) {
        handleError()
        console.log('Failed patch:', e);
    }
}

const { data: text, error } = await useCustomFetch<TextContent>('/text');
console.log('Text/Error:', { text: toRaw(text.value), error: toRaw(error.value) });
if (error.value) handleError();
else {
    let content = toRaw(text.value);
    if (content && content.homeTitle && content.homeText) {
        homeContent.value = { header: content.homeTitle, body: content.homeText }
        initialContent.value = { header: content.homeTitle, body: content.homeText }
    } else if (!content || (!content.homeTitle && !content.homeText)) {

    } else {
        homeContent.value = { header: '', body: '' };
        initialContent.value = { header: '', body: '' };
    }
}

const formClasses = [
    "w-full flex flex-col space-y-4 items-end",
    "xl:flex-row xl:space-x-4 xl:space-y-0 xl:items-end",
]

</script>

<template>
    <div class="flex flex-col items-center">
        <Toast :error="true" :visible="showErrorToast">{{ errorMsg }}</Toast>
        <Toast :visible="showSuccessToast">Saved</Toast>

        <div class="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-3xl xl:max-w-none xl:px-8 mt-6">
            <div class="w-full">
                <h3 class="font-semibold text-xl mb-5">Home Page</h3>

                <FormKit :errors="[]" v-model="homeContent" ref="formRef" id="promo-form" @submit="handleSubmit" type="form"
                    :actions="false">
                    <div :class="formClasses">
                        <div class="flex flex-col space-y-4 xl:flex-row xl:space-y-0 xl:space-x-4 w-full">
                            <div class="w-full">
                                <FormKit name="header" label="Header" type="text" validation="length:1,120" />
                            </div>

                            <div class="w-full">
                                <FormKit name="body" label="Intro Paragraph" type="textarea" :rows="8" />
                            </div>
                        </div>

                        <div class="w-full pt-6 xl:w-40 xl:pt-0">
                            <FormButtonSubmit :loading="loading" label="Save" />
                        </div>

                        <div v-show="false" class="text-center h-2 relative bottom-2">
                            <FormKitMessages :node="formRef?.node" />
                        </div>
                    </div>
                </FormKit>
            </div>
        </div>

        <div class="h-px w-full bg-slate-300 my-5" />

        <div class="w-full">
            <h1 class="font-medium text-xl mb-2 text-gray-500 text-center">Preview</h1>

            <PageTitle margin="ml-0">{{ homeContent.header }}</PageTitle>
            <p class="whitespace-pre-wrap">
                {{ homeContent.body }}
            </p>
        </div>
    </div>
</template>