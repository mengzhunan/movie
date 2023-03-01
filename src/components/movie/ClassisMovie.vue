<template>
    <div class="classis-movie">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-cell v-for="c in classisMovie" :key="c.id" style="padding: 0;">
                <div class="movie-list" @click="$router.push(`/detail/${c.movieId}`)">
                    <div class="poster">
                        <van-image lazy-load :src="c.poster" alt="" />
                    </div>
                    <div class="movieInfo">
                        <p class="movie-title">{{ c.movieInfo.title }}</p>
                        <p class="movie-etitle">{{ c.movieInfo.englishTitle }}</p>
                        <p class="movie-actors">{{ c.movieInfo.actors }}</p>
                        <p class="movie-showInfo">{{ c.movieInfo.showInfo }}</p>
                    </div>
                    <div class="score" v-if="c.score">
                        <span class="score-color">{{ c.score }}</span>
                        <span class="score-after">分</span>
                    </div>
                    <div class="score" v-else>
                        <span class="score-after">暂无评分</span>
                    </div>
                </div>
            </van-cell>
        </van-list>
    </div>
</template>

<script>
import { classicMovieAPI } from "@/apis/index";
// , moreClassicMovieAPI
export default {
    data() {
        return {
            classisMovie: [],
            moreClassisMovie: [],
            offset: [],
            loading: false,
            finished: false,
        }
    },
    mounted() {
        classicMovieAPI().then(data => {
            this.classisMovie = data
            console.log(this.classisMovie);
        })
    },
    methods: {
        onLoad() {
            // moreClassicMovieAPI().then(data => {
            //     this.moreClassisMovie = data
            // //     console.log(this.moreClassisMovie);
            //     this.loading = false;
            // })
        }
    }
}
</script>

<style lang="scss" scoped>
.movie-list {
    display: flex;
    margin-left: 20rem;
    margin-bottom: 20rem;

    .poster {
        width: 66rem;
        height: 94rem;

        img {
            width: 100%;
        }
    }

    .movieInfo {
        width: 229rem;
        margin-left: 10rem;
        height: 18rem;
        line-height: 18rem;
        color: var(--nav-black);
        font-size: 13rem;

        .movie-title {
            height: 24rem;
            line-height: 24rem;
            color: var(--nav-active-black);
            font-size: 16rem;
            font-weight: bold;
            margin-bottom: 4rem;
        }

        .movie-etitle {
            margin-bottom: 4rem;
        }

        .movie-actors {
            margin-bottom: 4rem;
        }

        .movie-showInfo {
            margin-bottom: 4rem;
        }
    }


    .score {
        .score-color {
            color: var(--score-yellow);
            font-size: 14rem;
        }

        .score-after {
            font-size: 12rem;
            color: var(--movie-score-after);
        }
    }
}
</style>