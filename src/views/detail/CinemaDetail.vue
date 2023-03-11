<template>
    <div>
        <LoadingPage v-show="!finish" />
        <div v-show="finish">
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
                <!-- <img class="bg" :src="cinemaMovieList[currentIndex]?.img" alt=""> -->
                <!-- <swiper :modules="modules" :pagination="{ clickable: true }">
                    <swiper-slide>Slide 1</swiper-slide>
                    <swiper-slide>Slide 2</swiper-slide>
                    <swiper-slide>Slide 3</swiper-slide>
                </swiper> -->
            </div>
            <div class="movie-info">
                <div class="movie-title">
                    <span class="movie-name">
                        {{ cinemaMovieList[0]?.nm }}
                    </span>
                    <span class="grade">
                        {{ cinemaMovieList[0]?.wish }}
                        <span class="small">人想看</span>
                    </span>
                </div>
                <div class="movie-desc">
                    {{ cinemaMovieList[0]?.desc }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import { cinemaDetailAPI, cinemaMovieListAPI } from '@/apis/index'
// import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
// import { Pagination } from 'swiper'
import LoadingPage from '@/components/LoadingPage.vue'

export default {
    props: ["id"],
    data() {
        return {
            isShow: false,
            cinema: [],
            cinemaMovieList: [],
            finish: false,
            currentIndex: 0,
            name: []
        };
    },
    mounted() {
        this.hide();
        cinemaDetailAPI(this.id).then(data => {
            this.cinema = data.data;
            console.log(this.cinema);
        });
        cinemaMovieListAPI(this.id, this.cityLocation.id).then(data => {
            this.cinemaMovieList = data.data.movies;
            console.log("list", this.cinemaMovieList);
            this.finish = true
        });
    },
    methods: {
        ...mapMutations(["hide"]),
    },
    computed: {
        ...mapState(["cityLocation"])
    },
    components: {
        LoadingPage,
        // Swiper,
        // SwiperSlide
    },
    // setup() {
    //     return {
    //         modules: [Pagination]
    //     }
    // }
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
        width: 34.7rem;
        height: 34.7rem;
        font-size: 24rem;
        text-align: center;
        line-height: 34.7rem;
    }

    .navbar-title {
        flex: 1;
        text-align: center;
        font-size: 18rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .showMore {
        width: 110rem;
        height: 185rem;
        background-color: var(--bg-white);
        position: absolute;
        right: 12rem;
        top: 48rem;
        box-shadow: 0 0.06rem 4.18rem 0 rgb(0 0 0 / 37%);
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

.movie-info {
    width: 100%;
    height: 66rem;
    padding: 11rem 15rem;
    border-bottom: 1rem solid var(--border-bottom);

    .movie-title {
        text-align: center;

        .movie-name {
            line-height: 24rem;
            font-size: 17rem;
            font-weight: bold;
            color: var(--nav-active-black);
            height: 22rem;
            margin-right: 5rem;
        }

        .grade {
            color: var(--score-yellow);
            font-size: 16rem;
            font-weight: bold;

            .small {
                font-size: 12rem;
            }
        }
    }

    .movie-desc {
        height: 18rem;
        margin-top: 2rem;
        font-size: 13rem;
        color: var(--movie-score-after);
        text-align: center;
    }
}
</style>