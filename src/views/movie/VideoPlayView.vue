<template>
    <div>
        <video width="100%" height="208rem" controls="controls" autoplay="autoplay">
            <!-- <source src="/i/movie.ogg" type="video/mp4" /> -->
        </video>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
    methods: {
        ...mapMutations(['hide']),
    },
    mounted() {
        this.hide();
    },
}
</script>

<style lang="scss" scoped></style>