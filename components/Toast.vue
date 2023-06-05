<script lang="ts" setup>

const wrapperClasses = [
    'fixed -bottom-full'
]
const textWrapperClasses = 'h-40 flex justify-center items-center'
const textClasses = ""
</script>

<template>
    <div :class="wrapperClasses">
        <div :class="textWrapperClasses">
            <p :class="textClasses">
                <slot></slot>
            </p>
        </div>
    </div>
</template>