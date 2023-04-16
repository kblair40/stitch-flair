<script lang="ts" setup>
import { emit } from 'process';

type Props = {
    isOpen: boolean;
}
const emit = defineEmits(['toggleNav'])
const props = defineProps<Props>();

const overlayClasses = [
    // 'border border-blue-500',
    'fixed top-0 right-0 bottom-0 left-0 h-screen w-screen',
    'bg-slate-400/25',
    'z-10'
]

const wrapperClasses = computed(() => {
    return [
        'absolute top-0 left-0 right-0 z-20',
        'pt-12 pb-8',
        'bg-white shadow-sm',
        'transition-transform duration-300',
        !props.isOpen ? '-translate-y-full' : '',
        'flex flex-col items-center space-y-6'
    ]
})

const linkClasses = [
    'w-20 text-center',
    'text-slate-600 border-b-2 border-transparent transition-colors duration-300',
    'hover:border-slate-500 hover:text-slate-800'
].join(' ')
const activeLinkClasses = '!border-slate-600 text-slate-800 font-medium'

const router = useRouter()

const handleClickLink = (path: string) => {
    emit('toggleNav')
    router.push(path);
}
</script>

<template>
    <div :class="wrapperClasses">
        <p class="text-center">content</p>
        <p class="text-center">content</p>
        <p class="text-center">content</p>
    </div>

    <!-- <div class="hidden md:flex items-center self-end space-x-8 pt-4"> -->
    <div :class="wrapperClasses">
        <NuxtLink @click="handleClickLink('/')" :class="linkClasses" :activeClass="activeLinkClasses" to="/">Home</NuxtLink>
        <NuxtLink @click="handleClickLink('/shop')" :class="linkClasses" :activeClass="activeLinkClasses" to="/shop">Shop
        </NuxtLink>
        <NuxtLink @click="handleClickLink('/contact')" :class="linkClasses" :activeClass="activeLinkClasses" to="/contact">
            Contact</NuxtLink>
    </div>

    <div @click="$emit('toggleNav')" v-if="isOpen" :class="overlayClasses"></div>
</template>