<script lang="ts" setup>
interface Props {
    tabLabels: string[],
    defaultTab?: string,
}
const props = defineProps<Props>();

const activeTab = ref(props.defaultTab || props.tabLabels[0])

const tabsClasses = [
    'w-full flex justify-center',
    'border'
]
const tabInnerClasses = "py-1 px-3 flex items-center justify-center h-min"
const activeTabClasses = [
    // 'bg-white',
    'font-medium',
    'border-b border-purplegrey'
]
</script>

<template>
    <div :class="tabsClasses">
        <div v-for="tabLabel in tabLabels" class="cursor-pointer h-min w-40" @click="activeTab = tabLabel">
            <div :class="activeTab === tabLabel ? activeTabClasses.concat(tabInnerClasses) : tabInnerClasses">
                {{ tabLabel }}
            </div>
        </div>
    </div>
</template>