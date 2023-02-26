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
// moreMovieListAPI
import { movieListAPI } from '@/apis/index'
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
        onLoad() {
            // 加载状态结束
            this.loading = false;

            // let id = '1218073,248949'
            // console.log(`index/movieOnInfoList?movieIds=${id}`);
            // moreMovieListAPI(id).then(data => console.log(456, data))


            // 数据全部加载完成
            if (this.movieList.length >= this.movieId.length) {
                console.log(this.movieId);
                // this.finished = true;
            }
        }
    },
    
}
</script>

<style lang="scss" scoped>
.nav {
    margin-bottom: 50rem;
}
</style>