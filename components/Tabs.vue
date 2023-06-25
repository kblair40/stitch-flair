<script lang="ts" setup>
interface Props {
    tabLabels: string[],
    defaultTab?: string,
}
const props = defineProps<Props>();
const emit = defineEmits(['change'])

const activeTab = ref(props.defaultTab || props.tabLabels[0])

const tabInnerClasses = [
    "flex items-center justify-center",
    "py-2 px-3 md:px-6 text-mdsm",
    "h-min whitespace-nowrap border-b border-transparent"
].join(' ')
const activeTabClasses = 'font-medium border-b border-purplegrey'

const handleChangeTab = (tab: string) => {
    console.log('new tab:', tab);
    activeTab.value = tab;
    emit('change', tab);
}
</script>

<template>
    <div class="w-min mx-auto h-full pt-2 flex xl:justify-center border-b">
        <div :class="activeTab === tabLabel ? activeTabClasses : ''" v-for="tabLabel in tabLabels" class="cursor-pointer h-min" @click="handleChangeTab(tabLabel)">
            <div :class="tabInnerClasses">
                {{ tabLabel }}
            </div>
        </div>
    </div>
</template>