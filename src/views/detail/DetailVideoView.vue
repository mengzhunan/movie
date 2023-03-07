<template>
    <div>
        <video width="100%" height="208rem" controls="controls">
            <source :src="this.$route.query.content.url" type="video/mp4" />
        </video>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped></style>