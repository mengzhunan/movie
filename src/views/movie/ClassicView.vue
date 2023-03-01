<template>
    <div class="list">
        <ClassisMovie />
    </div>
</template>

<script>
import ClassisMovie from '@/components/movie/ClassisMovie.vue';


export default {
    components: { ClassisMovie }
}
</script>

<style lang="scss" scoped>
.list {
    background-color: var(--bg-black);
}
</style>