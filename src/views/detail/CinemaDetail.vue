<template>
    <div>
        <div class="navbar">
            <van-icon name="arrow-left" class="back" @click="$router.go(-1)" />
            <div class="navbar-title">{{ cinema.nm }}</div>
            <van-icon class="icon" size="20rem" name="wap-nav" @click="isShow = !isShow" />
            <div class="showMore" v-show="isShow">
                <router-link to="/" class="showMore-item">首页</router-link>
                <router-link to="/board" class="showMore-item">榜单</router-link>
                <router-link to="/hot" class="showMore-item">热点</router-link>
                <router-link to="/shopping" class="showMore-item">商城</router-link>
            </div>
        </div>
        <div class="map">
            <div class="info">
                <div class="name">{{ cinema.nm }}</div>
                <div class="address">{{ cinema.addr }}</div>
            </div>
            <div class="location">
                <img src="../../assets/image/location.png" alt="">
            </div>
        </div>
        <div class="post">
            <van-swipe class="my-swipe" indicator-color="translate">
                <van-swipe-item v-for="p in cinemaMovieList" :key="p.id" style="width: 100rem;">
                    <div class="movie-poster">
                        <img :src="p.img" alt="">
                    </div>
                </van-swipe-item>
            </van-swipe>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import { cinemaDetailAPI, cinemaMovieListAPI } from '@/apis/index'

export default {
    props: ['id'],
    data() {
        return {
            isShow: false,
            cinema: [],
            cinemaMovieList: []
        }
    },
    mounted() {
        this.hide();
        // console.log(this.cityLocation.id);
        cinemaDetailAPI(this.id).then(data => {
            this.cinema = data.data
            console.log(this.cinema);
        }),
            cinemaMovieListAPI(this.id, this.cityLocation.id).then(data => {
                this.cinemaMovieList = data.data.movies
                console.log('list', this.cinemaMovieList);
            })
    },
    methods: {
        ...mapMutations(['hide']),
    },
    computed: {
        ...mapState(['cityLocation'])
    },
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

.map {
    width: 100%;
    height: 75rem;
    padding: 15rem 100rem 15rem 15rem;
    display: flex;
    position: relative;

    .info {
        max-width: 260rem;

        .name {
            font-size: 17rem;
            color: var(--nav-active-black);
            font-weight: bold;
            height: 24rem;
            line-height: 24rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }

        .address {
            height: 18rem;
            line-height: 18rem;
            margin-top: 2rem;
            font-size: 13rem;
            color: var(--movie-score-after);
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
    }

    .location {
        width: 70rem;
        height: 31rem;
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        text-align: center;
        border-left: 1rem solid var(--border-bottom);

        img {
            width: 19rem;
            height: 22rem;
            margin-top: 5rem;
        }
    }
}

.post {
    width: 100%;
    height: 135rem;
    display: flex;
    overflow: hidden;

    .movie-poster {
        width: 65rem;
        height: 95rem;

        img {
            width: 100%;
            height: 100%;
        }
    }
}
</style>