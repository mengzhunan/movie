<template>
    <div>
        影院页面
        <div>{{ cityLocation.city }}</div>
        <div>{{ cityLocation.id }}</div>

    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {

    computed: {
        ...mapState(['cityLocation'])
    },
}
</script>

<style lang="scss" scoped></style>