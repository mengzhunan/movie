<template>
    <div>
        猫眼想看榜
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

    }
}
</script>

<style lang="scss" scoped></style>