<script lang="ts" setup>
import type { PromoColor, Promotion } from '~~/utils/types';
import { useAdminStore } from '~~/store/adminStore';

const props = withDefaults(defineProps<{ text: string; color?: PromoColor }>(), {
    text: '',
    color: 'green',
})

interface FormValues {
    text: string;
    color: PromoColor
}

const store = useAdminStore();
store.getPromotions();

const showSuccessToast = ref(false);
const loading = ref(false);
const formRef = ref<HTMLFormElement | null>(null);
const formValues = ref<FormValues>({ text: '', color: 'green' });

const handleSubmit = async (formValues: any) => {
    // console.log('formValues:', formValues);
    const { text, color } = formValues;
    try {
        if (!text || !color) return;
        // color = color.toLowerCase();

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
    <div class="flex">

        <div :class="classes">{{ text }}</div>
    </div>
</template>