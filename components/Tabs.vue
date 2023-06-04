<script lang="ts" setup>
interface Props {
    tabLabels: string[],
    defaultTab?: string,
}
const props = defineProps<Props>();

const tabsClasses = [
    'w-full flex justify-center'
]
const tabClasses = [
    'border py-3 px-2 flex items-center justify-center h-min'
]
</script>

<template>
    <div :class="tabsClasses">
        <div v-for="tabLabel in tabLabels" :class="tabClasses">
            {{ tabLabel }}
        </div>
    </div>
</template>