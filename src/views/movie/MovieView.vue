<template>
    <div class="movie">
        <div class="hit-movie">
            <hitMovie />
        </div>
        <movieList />
    </div>
</template>

<script>
import hitMovie from "@/components/movie/hitMovie.vue"
import movieList from "@/components/movie/movieList.vue"

export default {
    components: {
        hitMovie,
        movieList
    },

}
</script>

<style lang="scss" scoped>
.hit-movie {
    padding: 12rem 15rem;
    margin-bottom: 10rem;
    background-color: #fff;
}
</style>