<script lang="ts" setup>
import type { PromoColor } from '~~/utils/types';

const props = withDefaults(defineProps<{ text: string; color?: PromoColor }>(), {
    text: '',
    color: 'green',
})
// const colorOptions = ['green', 'red', 'blue', 'orange', 'purple', 'peach'];
const colorClasses: { [key: string]: string } = {
    green: 'bg-green-300',
    red: 'bg-red-300',
    blue: 'bg-blue-300',
    orange: 'bg-orange-300', // TODO: Fix this with actual orange color
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
    <div :class="classes">{{ text }}</div>
</template>