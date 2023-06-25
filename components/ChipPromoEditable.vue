<script lang="ts" setup>
import type { PromoColor, Promotion } from '~~/utils/types';
import { useAdminStore } from '~~/store/adminStore';

type Props = { text: string; color: PromoColor };
const props = defineProps<Props>()


const store = useAdminStore();
store.getPromotions();

const showSuccessToast = ref(false);
const loading = ref(false);
const formRef = ref<HTMLFormElement | null>(null);
const formValues = ref<Props>({ ...props });

const handleSubmit = async (formValues: any) => {
    // console.log('formValues:', formValues);
    const { text, color } = formValues;
    try {
        if (!text || !color) return;

        loading.value = true;

        const res = await useCustomFetch('/promotion', {
            method: 'POST',
            body: { text: text.trim(), color },
        })

        console.log('Create Promotion Res:', res.data.value, '\n');
        if (res.data.value) {
            store.addPromotion(res.data.value as Promotion);
            showSuccessToast.value = true;

            setTimeout(() => {
                showSuccessToast.value = false;
            }, 3000)
        }
    } catch (e) {
        console.log('Failed to create product:', e)
    }

    setTimeout(() => {
        loading.value = false;
    }, 2000)
}

const colorClasses: { [key: string]: string } = {
    green: 'bg-green-300',
    red: 'bg-red-300',
    blue: 'bg-blue-300',
    orange: 'bg-orange-300',
    purple: 'bg-purple-300',
    peach: 'bg-peach-300',
}

const classes = computed(() => ([
    colorClasses[props.color],
    'flex justify-center items-center rounded-full w-min px-3 py-1',
    'leading-none whitespace-nowrap text-sm font-semibold'
]))
</script>

<template>
    <div class="w-full">
        <FormKit :errors="[]" v-model="formValues" ref="formRef" @submit="handleSubmit" type="form" :actions="false">
            <div :class="formClasses">
                <div class="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 w-full">
                    <div class="w-full h-18 max-h-18">
                        <FormKit name="text" label="Promo Text Label *" type="text"
                            validation="required:trim|length:1,32" />
                    </div>

                    <div class="w-full h-18 max-h-18">
                        <FormKit name="color" label="Color *" type="select" :options="colorOptions" />
                    </div>
                </div>

                <div class="w-full sm:w-40">
                    <FormKit :disabled="loading" :loading="loading" type="submit">Save</FormKit>
                </div>

                <div v-show="false" class="text-center h-2 relative bottom-2">
                    <FormKitMessages :node="formRef?.node" />
                </div>
            </div>
        </FormKit>

        <div class="mt-6 flex space-x-4">
            <p class="font-medium text-lg">Preview</p>
            <ChipPromo v-bind="formValues" />
        </div>
    </div>
</template>

<!-- <template>
    <div class="flex">
        <div :class="classes">{{ text }}</div>
    </div>
</template> -->