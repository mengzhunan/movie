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
                <div class="location" @click="goToMap()">
                    <img src="../../assets/image/location.png" alt="">
                </div>
            </div>
            <div class="post">
                <van-swipe @change="onChange" ref="swipe" class="swipe">
                    <van-swipe-item v-for="c in cinemaMovieList" :key="c.id">
                        <img :src="c.img" alt="">
                    </van-swipe-item>
                </van-swipe>
                <div class="movie-info">
                    <div class="movie-title">
                        <span class="movie-name">
                            {{ cinemaMovieList[currentIndex]?.nm }}
                        </span>
                        <span class="grade">
                            {{ cinemaMovieList[currentIndex]?.wish }}
                            <span class="small">人想看</span>
                        </span>
                    </div>
                    <div class="movie-desc">
                        {{ cinemaMovieList[currentIndex]?.desc }}
                    </div>
                </div>
                <van-tabs>
                    <div class="vip-tips">
                        <div class="label">折扣</div>
                        <div class="label-text">开卡享优惠</div>
                        <div class="process">9.9元起开卡></div>
                    </div>
                    <van-tab class="van-tab" :title="d.showDate" v-for="(d, i) in cinemaMovieList[currentIndex]?.shows"
                        :key="i" style="flex-direction: column;">
                        <div class="list-item" v-for="(a, b) in d.plist" :key="b">
                            <div class="time">
                                <div class="begin">
                                    {{ a?.tm }}
                                </div>
                                <div class="end">
                                    {{ toHourMinute }}散场
                                </div>
                            </div>
                            <div class="info-block">
                                <div class="lan">
                                    <span> {{ a.lang }}</span>
                                    <span>{{ a.tp }}</span>
                                </div>
                                <div class="hall">{{ a.th }}</div>
                            </div>
                            <div class="price">
                                <div>
                                    <span class="d">
                                        ¥
                                    </span>
                                    <span class="stonefont">
                                        {{ a.baseSellPrice }}
                                    </span>
                                </div>
                                <div class="vip-price">
                                    <div class="vip-card">
                                        {{ a.vipPriceName }}
                                    </div>
                                    <div class="card-price">
                                        ¥{{ a.vipPrice }}
                                    </div>
                                </div>
                                <div class="buy-btn">
                                    <div class="btn">
                                        购票
                                    </div>
                                </div>
                            </div>
                        </div>
                    </van-tab>
                </van-tabs>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import { cinemaDetailAPI, cinemaMovieListAPI } from '@/apis/index'
import LoadingPage from '@/components/LoadingPage.vue'

export default {
    props: ["id"],
    data() {
        return {
            isShow: false,
            cinema: [],
            cinemaMovieList: [],
            finish: false,
            name: [],
            currentIndex: 0,
        };
    },
    mounted() {
        this.hide();
        cinemaDetailAPI(this.id).then(data => {
            this.cinema = data.data;
            // console.log('cinema', this.cinema);
        });
        cinemaMovieListAPI(this.id, this.cityLocation.id).then(data => {
            this.cinemaMovieList = data.data.movies;
            console.log("list", this.cinemaMovieList);
            this.finish = true
        });
    },
    methods: {
        ...mapMutations(["hide"]),
        onChange(index) {
            this.currentIndex = index
        },
        goToMap() {
            this.$router.push({
                path: '/map',
                query: {
                    content: this.cinema
                }
            })

        }
    },
    computed: {
        ...mapState(["cityLocation"]),
        // toMinutes() {

        // },
        toHourMinute(minutes) {
            minutes = this.cinemaMovieList[this.currentIndex]?.dur

            var dateTime = new Date();
            dateTime = dateTime.setMinutes(dateTime.getMinutes() + minutes);
            dateTime = new Date(dateTime);
            console.log(dateTime);


            return (Math.floor(minutes / 60) + ':' + (minutes % 60));
        }

    },
    components: {
        LoadingPage,
    },
    watch: {
        cinemaMovieList() {
            var _this = this;
            setTimeout(() => {
                _this.$refs.swipe.resize();
            }, 500);
        }
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

.post {
    width: 100%;
    height: 175rem;

    .swipe {
        width: 100%;
        height: 100%;

        img {
            width: 100%;
            height: 100%;
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

.vip-tips {
    width: 100%;
    height: 42rem;
    margin: 0;
    padding: 0 15rem;
    background-color: #fff5ea;
    display: flex;
    border-bottom: 1rem solid var(--border-bottom);

    .label {
        width: 34rem;
        height: 15rem;
        margin-right: 10rem;
        margin-top: 13rem;
        background-color: #ff941a;
        border-radius: 2rem;
        color: #fff;
        text-align: center;
        line-height: 15rem;
    }

    .label-text {
        width: 228rem;
        line-height: 42rem;
        color: #fa9600;
    }

    .process {
        font-size: 12rem;
        line-height: 42rem;
        color: var(--movie-score-after);
    }
}

.van-tab {

    .list-item {
        width: 100%;
        height: 88rem;
        padding: 17rem 12rem;
        display: flex;
        border-bottom: 1rem solid var(--border-bottom);

        .time {
            width: 50rem;
            height: 50rem;

            .begin {
                font-size: 20rem;
                color: var(--nav-active-black);
            }

            .end {
                margin-top: 10rem;
                font-size: 12rem;
                color: var(--movie-score-after);
            }
        }

        .info-block {
            width: 95rem;
            height: 55rem;
            margin-left: 17rem;

            .lan {
                font-size: 13rem;
                color: var(--nav-active-black);
            }

            .hall {
                width: 96rem;
                height: 27rem;
                margin-top: 7rem;
                overflow: hidden;
                // white-space: nowrap;
                text-overflow: ellipsis;
                font-size: 12rem;
                line-height: 14rem;
                color: var(--movie-score-after);
            }
        }

        .price {
            display: flex;

            .d {
                font-size: 12rem;
                color: #f03d37;
            }

            .stonefont {
                color: #f03d37;
                font-size: 19rem;
            }

            .vip-price {
                font-size: 12rem;
                display: flex;
                margin-left: 4rem;

                .vip-card {
                    line-height: 14rem;
                    height: 14rem;
                    color: #fff;
                    background-color: #f90;
                    border: 1rem solid #f90;
                }

                .card-price {
                    line-height: 14rem;
                    height: 14rem;
                    border: 1rem solid rgba(255, 153, 0, 0.562);
                    color: #f90;
                    border-radius: 0 3rem 3rem 0;
                    padding-left: 3rem;
                }
            }

            .buy-btn {
                width: 45rem;
                height: 54rem;
                margin-left: 11rem;
                position: relative;

                .btn {
                    width: 47rem;
                    height: 27rem;
                    border: 1rem solid #f06762;
                    color: #f03d37;
                    border-radius: 20rem;
                    text-align: center;
                    line-height: 27rem;
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                }
            }
        }
    }

}
</style>