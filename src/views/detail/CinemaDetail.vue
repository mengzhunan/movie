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
                <div class="location" @click="goToMap(cinema)">
                    <img src="../../assets/image/location.png" alt="">
                </div>
            </div>
            <div class="post">
                <img class="bg" :src="cinemaMovieList[currentIndex]?.img" alt="">
                <van-swipe @change="onChange" :show-indicators="false" :loop="false" ref="swipe" class="swipe">
                    <van-swipe-item v-for="c in cinemaMovieList" :key="c.id">
                        <img :src="c.img" alt="" class="poster">
                    </van-swipe-item>
                </van-swipe>
            </div>
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
                <van-tab class="van-tab" :title="month(d)" v-for="(d, i) in cinemaMovieList[currentIndex]?.shows" :key="i"
                    style="flex-direction: column;">

                    <div v-if="!d.plist.length" class="no-seat">
                        <div class="null">
                            <img src="../../assets/image/null.png" alt="">
                        </div>
                        <div class="text">
                            影片暂未上映
                        </div>
                    </div>
                    <div class="list-item" v-for="(a, b) in d.plist" :key="b" v-else @click="purchaseTickets()">
                        <div class="time">
                            <div class="begin">
                                {{ a?.tm }}
                            </div>
                            <div class="end">
                                {{ toHourMinute(a) }}散场
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
                            <div class="n-price">
                                <span class="d">
                                    ¥
                                </span>
                                <span class="stonefont">
                                    {{ a.baseSellPrice }}
                                </span>
                            </div>
                            <div class="vip-price" v-if="a.vipPriceName">
                                <div class="vip-card">
                                    {{ a.vipPriceName }}
                                </div>
                                <div class="card-price">
                                    ¥{{ a.vipPrice }}
                                </div>
                            </div>
                            <div class="no-price" v-else>

                            </div>
                        </div>

                        <div class="buy-btn">
                            <div class="btn">
                                购票
                            </div>
                        </div>
                    </div>
                </van-tab>
            </van-tabs>
            <div class="gap"></div>
            <div class="food">
                <div class="header">
                    影院超值套餐
                </div>
                <div class="food-item">
                    <div class="food-img">
                        <img :src="food.imageUrl" alt="">
                    </div>
                    <div class="food-name">
                        <div class="deal-title">
                            <span class="title-tag">
                                {{ food.titleTag }}
                            </span>
                            {{ food.title }}
                        </div>
                        <div class="sell-num">
                            {{ food.curNumberDesc }}
                        </div>
                        <div class="buy-info">
                            <div class="food-price">
                                ￥
                                <span class="num">
                                    {{ food.price }}
                                </span>
                            </div>
                            <div class="buy-btn" @click="buyFood()">
                                去购买
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import { cinemaDetailAPI, cinemaMovieListAPI, foodAPI } from '@/apis/index'
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
            food: [],
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
            // console.log("list", this.cinemaMovieList);
            this.finish = true
        });
        foodAPI().then(data => {
            this.food = data.data.dealList[0]
            // console.log(this.food);
        })
    },
    methods: {
        ...mapMutations(["hide"]),
        onChange(index) {
            this.currentIndex = index
        },
        goToMap(cinema) {
            this.$router.push({
                path: '/map',
                query: {
                    content: JSON.stringify(cinema)
                }
            })

        },
        month(d) {
            let arr = d.showDate.split('-')
            return (`${arr[1]}月${arr[2]}日`)
        },
        toHourMinute(a) {
            let hour = a.tm.split(':')[0]
            let min = a.tm.split(':')[1]
            let minutes = this.cinemaMovieList[this.currentIndex]?.dur

            let resHour = Number(hour) + Math.floor(minutes / 60)
            let resMin = Number(min) + Math.floor(minutes % 60)

            if (resMin > 60) {
                resMin -= 60
                resHour += 1
            }
            if (resHour >= 24) {
                resHour -= 24
            }
            resHour = resHour >= 10 ? resHour : '0' + resHour
            resMin = resMin >= 10 ? resMin : '0' + resMin
            return (`${resHour}:${resMin}`)
        },
        buyFood() {
            this.$router.push({
                path: '/buyfood',
                query: {
                    content: JSON.stringify(this.food)
                }
            })
        },
        purchaseTickets() {
            console.log(1);
            this.$router.push('/seat')
        }
    },
    computed: {
        ...mapState(["cityLocation"]),
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
    height: 135rem;
    position: relative;

    &::before {
        content: '';
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 1;
        background-color: #000000b2;
    }

    .bg {
        position: absolute;
        filter: blur(2rem);
        overflow: hidden;
        width: 100%;
        height: 100%;
    }

    .swipe {
        width: 100%;
        height: 100%;
        z-index: 99;

        img {
            position: absolute;
            top: 50%;
            left: 42%;
            transform: translateY(-50%);
            width: 65rem;
            height: 95rem;
            border: 3rem solid #fff;
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
    .no-seat {
        width: 100%;
        height: 230rem;

        .null {
            width: 77rem;
            height: 71rem;
            margin: 50rem auto 0;

            img {
                width: 100%;
                height: 100%;
            }
        }

        .text {
            margin-top: 10rem;
            text-align: center;
        }
    }


    .list-item {
        width: 100%;
        height: 88rem;
        padding: 17rem 12rem;
        display: flex;
        border-bottom: 1rem solid var(--border-bottom);

        .time {
            width: 55rem;
            height: 50rem;

            .begin {
                font-size: 20rem;
                color: var(--nav-active-black);
            }

            .end {
                width: 55rem;
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

            .n-price {
                width: 48rem;
                height: 26rem;
                white-space: nowrap;

                .d {
                    font-size: 12rem;
                    color: #f03d37;
                }

                .stonefont {
                    color: #f03d37;
                    font-size: 19rem;
                }
            }

            .vip-price {
                font-size: 12rem;
                display: flex;

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

            .no-price {
                width: 63rem;
            }

        }

        .buy-btn {
            width: 45rem;
            height: 54rem;
            margin-left: 10rem;
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

.gap {
    width: 100%;
    height: 10rem;
    background-color: var(--border-bottom);
}

.food {
    width: 100%;
    padding: 0 15rem;

    .header {
        height: 41rem;
        border-bottom: 1rem solid var(--border-bottom);
        font-size: 15rem;
        color: #666;
        padding: 12rem 0;
    }

    .food-item {
        height: 123rem;
        padding: 15rem 0;
        border-bottom: 1rem solid var(--border-bottom);
        display: flex;

        .food-img {
            width: 92rem;
            height: 92rem;
            margin-right: 15rem;

            img {
                width: 100%;
                height: 100%;
            }
        }

        .food-name {
            flex: 1;

            .deal-title {
                width: 100%;
                height: 36rem;
                font-size: 14rem;
                color: var(--nav-active-black);

                .title-tag {
                    width: 32rem;
                    height: 15rem;
                    padding: 0 4rem;
                    margin-right: 7rem;
                    font-size: 12rem;
                    background-color: #f90;
                    color: var(--bg-white);
                    border-radius: 3rem;
                }
            }

            .sell-num {
                width: 100%;
                height: 29rem;
                line-height: 29rem;
                text-align: end;
                font-size: 12rem;
                color: var(--movie-score-after);
            }

            .buy-info {
                width: 100%;
                height: 27rem;
                display: flex;
                justify-content: space-between;

                .food-price {
                    color: var(--tab-active);
                    font-size: 14rem;
                    line-height: 27rem;

                    .num {
                        font-size: 17rem;
                    }
                }

                .buy-btn {
                    width: 52rem;
                    height: 27rem;
                    border-radius: 3rem;
                    background-color: var(--tab-active);
                    padding: 0 8rem;
                    color: var(--bg-white);
                    line-height: 27rem;
                    text-align: center;
                }
            }
        }
    }
}
</style>