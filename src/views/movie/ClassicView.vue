<template>
    <div class="list">
        <div class="classic-movie"></div>
    </div>
</template>

<script>
import classicMovieAPI from '@/apis/index'
export default {
    data() {
        return {
            classicMovie: []
        }
    },
    mounted() {
        classicMovieAPI().then(data => {
            this.classicMovie = data
            console.log(this.classicMovie);
        })
    }
}
</script>

<style lang="scss" scoped>
.list {
    padding-top: 14.5em;

    .classic-movie {
        width: 370em;
        height: 94em;
    }
}
</style>