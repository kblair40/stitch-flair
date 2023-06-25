<script lang="ts" setup>
import type { PromoColor, Promotion } from '~~/utils/types';
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

const showSuccessToast = ref(false);
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
    "w-full flex flex-col space-y-4 items-end",
    "md:flex-row md:space-x-4 md:space-y-0 md:items-end",
]
const inputClasses = 'h-8'
const iconBtnClasses = [
    'relative bottom-1 border transition-colors',
    'bg-white hover:bg-gray-50 active:bg-gray-100'
]
</script>

<template>
    <div class="flex w-full flex-col items-center">
        <div class="mb-4 flex">
            <p class="italic text-gray-500 mr-3">Editing</p>
            <ChipPromo v-bind="formValues" />
        </div>

        <FormKit :errors="[]" v-model="formValues" @submit="handleSubmit" type="form" :actions="false">
            <div :class="formClasses">
                <div class="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
                    <div class="h-16 max-h-18">
                        <FormKit :input-class="inputClasses" name="text" label="Promo Text Label *" type="text"
                            validation="required:trim|length:1,32" />
                    </div>

                    <div class="h-16 max-h-18">
                        <FormKit :input-class="inputClasses" name="color" label="Color *" type="select"
                            :options="colorOptions" />
                    </div>
                </div>

                <div class="flex space-x-2 w-full items-center">
                    <div class="w-full">
                        <FormKit :disabled="loading" :loading="loading" type="submit">Save</FormKit>
                    </div>
                    <button :class="iconBtnClasses" class="rounded-full h-8 w-8 min-w-8 flex items-center justify-center"
                        @click="$emit('cancel')">
                        <img src="/icons/close.svg" />
                    </button>
                </div>
            </div>
        </FormKit>
    </div>
</template>