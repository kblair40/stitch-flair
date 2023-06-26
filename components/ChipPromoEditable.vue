<script lang="ts" setup>
import type { PromoColor } from '~~/utils/types';
import { useAdminStore } from '~~/store/adminStore';

const emit = defineEmits(['cancel', 'error', 'success'])
interface FormValues {
    text: string;
    color: PromoColor;
}
interface Props extends FormValues {
    id?: number;
    idx: number;
}
const props = defineProps<Props>()

const store = useAdminStore();
store.getPromotions();

const colors = ['Green', 'Red', 'Blue', 'Orange', 'Purple', 'Peach']
const colorOptions = computed(() => {
    return colors.map(color => {
        return { value: color.toLowerCase(), label: color }
    })
})

const loading = ref(false);
const formValues = ref<Props>({ ...props });
const initialFormValues = ref<Props>({ ...props });

const handleSubmit = async (formValues: Props) => {
    const { text, color } = formValues;
    if (!text || !color) return;

    const body: { [key: string]: string } = {};
    if (text.trim() !== initialFormValues.value.text.trim()) {
        body['text'] = text.trim();
    }
    if (color !== initialFormValues.value.color) {
        body['color'] = color;
    }
    if (!Object.keys(body).length) {
        console.log('\nNo changes');
        return;
    }

    if (!props.id) {
        console.warn('No Promo ID - Returning early...');
        return;
    }

    loading.value = true;
    try {
        const res = await useCustomFetch(`/promotion/${props.id}`, { method: 'PATCH', body })
        console.log('Patch Promo Res:', res, '\n');
        if (res.data.value) {
            store.updatePromotions(props.idx, body)
            emit('success')
        }
    } catch (e) {
        console.log('Failed to create product:', e)
    }

    loading.value = false;
}

const formClasses = [
    "w-full flex flex-col space-y-4 items-center",
    "lg:flex-row lg:space-x-4 lg:space-y-0 lg:items-end",
]
const iconBtnClasses = [
    "border transition-colors",
    'bg-white hover:bg-gray-50 active:bg-gray-100'
]
const inputWrapperClasses = [
    "flex flex-col space-y-4",
    "md:flex-row md:justify-center md:space-y-0 md:space-x-4",
    "lg:w-full"
]
</script>

<template>
    <div class="flex w-full flex-col items-center">
        <div class="mb-4 flex">
            <p class="italic text-gray-500 mr-3">Editing</p>
            <ChipPromo v-bind="formValues" />
        </div>

        <FormKit form-class="w-full" :errors="[]" v-model="formValues" @submit="handleSubmit" type="form" :actions="false">
            <div :class="formClasses">
                <div :class="inputWrapperClasses">
                    <div class="h-16 max-h-18 lg:w-52">
                        <FormKit label-class="whitespace-nowrap" input-class="h-8" name="text" label="Promo Text Label *" type="text"
                            validation="required:trim|length:1,32" />
                    </div>

                    <div class="h-16 max-h-18">
                        <FormKit label-class="whitespace-nowrap" input-class="h-8" name="color" label="Color *" type="select" :options="colorOptions" />
                    </div>
                </div>

                <div class="flex items-center space-x-2 w-full justify-center">
                    <div class="w-40">
                        <FormKit :disabled="loading" :loading="loading" type="submit">Save</FormKit>
                    </div>
                    <button type="button" :class="iconBtnClasses"
                        class="rounded-full h-8 w-8 min-w-8 flex items-center justify-center" @click="$emit('cancel')">
                        <img src="/icons/close.svg" />
                    </button>
                </div>
            </div>
        </FormKit>
    </div>
</template>