<script lang="ts" setup>
const footerClasses = [
    "pt-8 mb-1.5 text-center text-sm"
]
</script>

<template>
    <p :class="footerClasses" class="page-footer">
        &#169; Stitch Flair {{ new Date().getFullYear() }}
    </p>
</template>