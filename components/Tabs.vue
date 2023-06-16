<script lang="ts" setup>
interface Props {
    tabLabels: string[],
    defaultTab?: string,
}
const props = defineProps<Props>();
const emit = defineEmits(['change'])

const activeTab = ref(props.defaultTab || props.tabLabels[0])

const tabInnerClasses = "py-2 px-3 flex items-center justify-center h-min whitespace-nowrap"
const activeTabClasses = 'font-medium border-b border-purplegrey'

const handleChangeTab = (tab: string) => {
    console.log('new tab:', tab);
    activeTab.value = tab;
    emit('change', tab);
}
</script>

<template>
    <div class="w-full flex justify-center">
        <div v-for="tabLabel in tabLabels" class="cursor-pointer h-min w-48" @click="handleChangeTab(tabLabel)">
            <div :class="activeTab === tabLabel ? `${tabInnerClasses} ${activeTabClasses}` : tabInnerClasses">
                {{ tabLabel }}
            </div>
        </div>
    </div>
</template>