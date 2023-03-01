<template>
    <div>
        <div class="nav">
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
                <van-cell v-for="m in movieList" :key="m.id">
                    <movieCard :m="m" />
                </van-cell>
            </van-list>
        </div>
    </div>
</template>

<script>
// 
import { movieListAPI, moreMovieListAPI } from '@/apis/index'
import movieCard from './movieCard.vue'

export default {
    data() {
        return {
            movieList: [],
            movieId: [],
            loading: false,
            finished: false,
        }
    },

    components: {
        movieCard
    },
    mounted() {
        movieListAPI().then(data => {
            this.movieList = data.movieList
            this.movieId = data.movieIds
        })
    },

    methods: {
        // 触底加载更多
        onLoad() {
            let id = (this.movieId.slice(this.movieList.length, this.movieList.length + 10)).join(',')
            moreMovieListAPI(id).then(data => {
                this.movieList = [...this.movieList, ...data.coming]

                this.loading = false;

                if (this.movieList.length >= this.movieId.length) {
                    this.finished = true;
                }
            })
        }
    },

}
</script>

<style lang="scss" scoped>
.nav {
    margin-bottom: 50rem;
}
</style>