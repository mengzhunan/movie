<template>
    <div>
        <StayMovie />
    </div>
</template>

<script>
import StayMovie from '@/components/movie/StayMovie.vue';

export default {
    components: { StayMovie }
}
</script>

<style lang="scss" scoped>
    div{
        background-color: var(--bg-black);
    }
</style>