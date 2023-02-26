<template>
    <div>
        <div class="nav">
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
                <van-cell v-for="m in movieList" :key="m.id">
                    <div class="cell-item">
                        <div class="cover">
                            <van-image lazy-load :src="m.img" alt="" class="auto-img" />
                        </div>
                        <div class="content-wrapper">
                            <div class="content">
                                <div class="name van-ellipsis">{{ m.nm }}</div>
                                <div class="score">观众评 <span class="sc">{{ m.sc }}</span></div>
                                <div class="star van-ellipsis">主演:{{ m.star }}</div>
                                <div class="show">{{ m.showInfo }}</div>
                            </div>
                            <div class="but">
                                <div class="but-content">{{ m.showStateButton.content }}</div>
                            </div>
                        </div>
                    </div>

                </van-cell>
            </van-list>


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
            loading: false,
            finished: false,
        }
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

            // 数据全部加载完成
            if (this.movieList.length >= this.movieId.length) {
                this.finished = true;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.cell-item {
    display: flex;
}

.cover {
    flex-shrink: 0;
    width: 64rem;
    height: 90rem;
    margin-right: 10rem;

    .auto-img {
        width: 100%;
        height: 100%;
        display: block;
    }
}

.content-wrapper {
    flex: 1;
    display: flex;
    align-items: center;


    .content {
        width: 220rem;
        flex: 1;

        .name{
            font-size: 18rem;
            font-weight: 900;
            color:var(--nav-active-black);
        }

        .score,.star,.show{
            font-size: 13rem;
            color:var(--tab-inactive);
        }

        .sc{
            font-size: 15rem;
            font-weight: 700;
            color:var(--score-yellow);
        }
    }

    .but {
        width: 54rem auto;
        background-color: var(--tab-active);
        border-radius: 20rem;
        box-shadow: 0 0.04rem 0.04rem 0 rgb(240 61 55 / 15%);

        .but-content {
            font-size: 12rem;
            padding: 0 12rem;
            font-weight: 500;
            color: #fff;

        }
    }
}
</style>