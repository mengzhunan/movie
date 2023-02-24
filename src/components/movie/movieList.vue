<template>
    <div>
        <div class="nav">
            <div class="item">
                <div class="cover" v-for="m in movieList" :key="m.id">
                    <img :src="m.img" alt="" class="auto-img">
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import { movieListAPI } from '@/apis/index'

export default {
    data() {
        return {
            movieList: [],
            movieId: [],
        }
    },
    mounted() {
        movieListAPI().then(data => {
            this.movieList = data.movieList
            this.movieId = data.movieIds
        })
    }
}
</script>

<style lang="scss" scoped>
.cover {
    width: 64rem;
    height: 90rem;

    .auto-img {
        width: 100%;
        height: 100%;
        display: block;
    }
}
</style>