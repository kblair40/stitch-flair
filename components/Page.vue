<template>
    <div class="min-h-screen flex flex-column">
        <div class="main-content">
            <slot></slot>

            <!-- <p class="pt-16 absolute bottom-1 left-0 right-0 text-center text-sm">
                &#169; Stitch Flair {{ new Date().getFullYear() }}
            </p> -->
        </div>

    </div>
</template>

<style lang="css" scoped>
.main-content {
    border: 1px solid red;
    overflow-y: auto;
    position: absolute;
    top: 160px;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    /* padding-bottom: 1rem; */
    min-height: calc(100vh - 160px);
}

@media screen and (min-width: 480px) {
    .main-content {
        /* height: calc(100vh - 304px); */
        top: 208px;
        min-height: calc(100vh - 208px);
    }
}

@media screen and (min-width: 640px) {
    .main-content {
        /* height: calc(100vh - 368px); */
        top: 256px;
        min-height: calc(100vh - 256px);
    }
}
</style>