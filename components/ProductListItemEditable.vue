<script lang="ts" setup>
interface Props {
    name: string;
    image_url: string;
    price: string;
}
defineProps<Props>();

const cardClasses = [
    'z-20 p-2 bg-white relative',
    "min-w-75 w-75 max-w-75",
    "cursor-pointer group rounded-md",
]
const imgWrapperClasses = "overflow-hidden w-full h-auto sm:h-56 lg:h-64";
const imgClasses = [
    "object-cover h-full rounded-sm",
    "group-hover:scale-105",
    "transition-transform duration-300"
]
const iconBtnClasses = [
    "transition-colors duration-300",
    "hover:bg-red-200 active:bg-red-300 rounded-full z-40 absolute top-2 right-2 border p-1",
]
</script>

<template>
    <div :class="cardClasses">
        <button :class="iconBtnClasses">
            <img class="scale-75" src="/icons/trash.svg" />
        </button>

        <div :class="imgWrapperClasses">
            <img :src="image_url" :class="imgClasses" />
        </div>

        <p class="font-medium mt-2">{{ name }}</p>
        <p class="font-semibold mt-1">{{ price }}</p>
    </div>
</template>