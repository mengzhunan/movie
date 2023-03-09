<template>
    <div>
        {{ id }}
    </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
    props: ['id'],
    data() {
        return {

        }
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