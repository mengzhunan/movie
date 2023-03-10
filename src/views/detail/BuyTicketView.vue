<template>
    <div>
        <LoadingPage v-if="loadingState" />
        <div v-else>
            <div class="navbar">
                <van-icon name="arrow-left" class="back" @click="$router.go(-1)" />
                <div class="navbar-title">{{ movieDetail.nm }}</div>
                <van-icon class="icon" size="20rem" name="wap-nav" @click="isShow = !isShow" />
                <div class="showMore" v-show="isShow">
                    <router-link to="/" class="showMore-item">首页</router-link>
                    <router-link to="/board" class="showMore-item">榜单</router-link>
                    <router-link to="/hot" class="showMore-item">热点</router-link>
                    <router-link to="/shopping" class="showMore-item">商城</router-link>
                </div>
            </div>

            <div class="movie-detail" :style="{ 'background-color': movieDetail.backgroundColor }">
                <van-image lazy-load :src="movieDetail.img" class="detail-poster" />
                <div class="movie-text">
                    <p class="name">{{ movieDetail.nm }}</p>
                    <p class="e-name">{{ movieDetail.enm }}</p>
                    <p class="wish" v-if="$route.query.m?.showStateButton.content == '购票' ? true : false">
                        {{ movieDetail.sc }} <span class="sum">({{ (movieDetail.snum / 10000).toFixed(1) }}万人评)</span>
                    </p>
                    <p class="wish" v-else>{{ movieDetail.wish }}人想看</p>
                    <p>{{ movieDetail.cat }}</p>
                    <p>{{ movieDetail.src }}/{{ movieDetail.episodeDur }}分钟</p>
                    <p>{{ movieDetail.onlineDate }}</p>
                </div>
                <van-icon name="arrow" class="goDetail" @click="$router.push(`/detail/${id}`)" />
            </div>

            <FilmRelease :movieId="id"/>

        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { movieDetailAPI } from '@/apis'
import LoadingPage from '@/components/LoadingPage.vue'
import FilmRelease from '@/components/detail/FilmRelease.vue'

export default {
    props: ['id'],
    components: {
        LoadingPage,
        FilmRelease
    },
    data() {
        return {
            isShow: false,
            movieDetail: [],
            loadingState: true,
        }
    },
    mounted() {
        this.hide();
        movieDetailAPI(this.id).then(data => {
            this.movieDetail = data.movie
            this.loadingState = false
        })

    },
    methods: {
        ...mapMutations(['hide']),
    }
}
</script>

<style lang="scss" scoped>
.navbar {
    display: flex;
    align-items: center;
    height: 50rem;
    padding: 6rem;
    box-sizing: border-box;
    color: var(--bg-white);
    background-color: var(--theme-color);

    .back {
        width: 34rem;
        height: 34rem;
        font-size: 24rem;
        text-align: center;
        line-height: 34rem;
    }

    .navbar-title {
        flex: 1;
        text-align: center;
        font-size: 18rem;
    }
}

.showMore {
    width: 110rem;
    height: 185rem;
    background-color: var(--bg-white);
    position: absolute;
    right: 12rem;
    top: 48rem;
    box-shadow: 0 4rem 4rem 0 rgb(0 0 0 / 37%);
    z-index: 99;
    display: flex;
    flex-direction: column;

    .showMore-item {
        flex: 1;
        border-bottom: 1px solid var(--border-bottom);
        color: var(--nav-active-black);
        font-size: 15rem;
        text-align: center;
        line-height: 45rem;

        &:last-child() {
            border: none;
        }
    }
}

.movie-detail {
    width: 100%;
    height: 180rem;
    padding: 18rem 28rem 18rem 14rem;
    display: flex;
    position: relative;

    .detail-poster {
        width: 105rem;
        height: 144rem;

        img {
            height: 100%;
        }
    }

    .goDetail {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 10rem;
        font-size: 18rem;
        color: var(--bg-white);
    }
}

.movie-text {
    color: #fff;
    height: 100%;
    flex: 1;
    margin-left: 12rem;

    p {
        margin-top: 10rem;
    }

    .name {
        font-weight: bold;
        font-size: 18rem;
        margin: 0;
    }

    .e-name {
        font-size: 12rem;
    }

    .wish {
        color: var(--score-yellow);
        font-weight: bold;
        font-size: 17rem;

        .sum {
            font-size: 12rem;
            color: var(--text-grey);
        }
    }
}
</style>