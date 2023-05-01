<script lang="ts" setup>
const footerClasses = [
    // "pt-16 absolute bottom-1 left-0 right-0 text-center text-sm" // original
    "pt-16 mb-1 text-center text-sm"
]
</script>

<template>
    <p :class="footerClasses" class="page-footer">
        &#169; Stitch Flair {{ new Date().getFullYear() }}
    </p>
</template>