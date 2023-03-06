<template>
    <div>
        <VideoDetail />
    </div>
</template>

<script>
import VideoDetail from '@/components/detail/VideoDetail.vue'

import { mapMutations } from 'vuex'

export default {
    components: {
        VideoDetail,
    },
    mounted() {
        this.hide();
    },
    methods: {
        ...mapMutations(['hide']),
    }
}
</script>

<style lang="scss" scoped></style>