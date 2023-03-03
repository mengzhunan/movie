<template>
    <div>
        shopping
    </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
    data() {
        return {

        }
    },
    methods: {
        ...mapMutations(['hide']),
    },
    mounted() {
        this.hide();
    },
}
</script>

<style lang="scss" scoped></style>