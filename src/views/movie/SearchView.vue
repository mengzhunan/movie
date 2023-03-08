<template>
    <div class="search">
        <div class="navbar">
            <van-icon name="arrow-left" class="back" @click="goBack()" />
            <div class="navbar-title">猫眼电影</div>
            <div></div>
        </div>
        <form action="/">
            <van-search v-model="value" show-action placeholder="搜电影、搜影院" @search="onSearch" @cancel="onCancel"
                style="border-bottom: 1rem solid var(--search-border);" />
        </form>
        <div class="search-res" v-show="res.length > 1">
            <div class="search-movie">
                电影/电视剧/综艺
            </div>
            <div class="list">
                <div class="movie-cell" v-for="r in res.slice(0, 3)" :key="r.id">
                    <div class="poster">
                        <img :src="r.poster" alt="">
                    </div>
                    <div class="text">
                        <p class="name">{{ r.name }}</p>
                        <p class="ename">{{ r.ename }}</p>
                        <p class="catogary">{{ r.catogary }}</p>
                        <p class="release">{{ r.release }}</p>
                    </div>
                    <div class="score">
                        <div class="movie-score" v-if="r.score">
                            <span>{{ r.score }}</span>
                            <span class="score-after">分</span>
                        </div>
                        <div v-else>暂无评分</div>
                    </div>
                </div>
            </div>
            <div class="more">
                查看全部{{ res.length }}部影视剧
            </div>
            <div v-show="this.cinema.length > 0">
                <div class="cinema-res">
                    影院
                </div>
                <div class="cinema-list">
                    <div class="list-item" v-for="c in this.cinema.slice(0, 2)" :key="c.id">
                        <p class="p-name-price">
                            <span class="cinema-name"> {{ c.info.name }}</span>
                            <span class="cinema-price">
                                <span>{{ c.info.price }}</span>
                                <span class="price-after">元起</span>
                            </span>
                        </p>
                        <p class="address">
                            {{ c.info.address }}
                        </p>
                        <p class="tags">
                            <span class="tag" v-for="(s, i) in c.info.tags" :key="i">{{ s }}</span>
                        </p>
                    </div>
                </div>
                <div class="more-cinema">
                    查看全部{{ cinema.length }}家影院
                </div>
            </div>
        </div>
        <!-- <van-empty image="search" description="没有找到相关内容" style="background-color: #fff;" v-show="res.length < 1" /> -->
    </div>
</template>

<script>
import { searchMovieAPI, searchCinemaAPI } from '@/apis';
import { mapMutations, mapState } from 'vuex'

export default {
    data() {
        return {
            value: '',
            res: [],
            cinema: []
        }
    },
    mounted() {
        this.hide();
    },
    methods: {
        ...mapMutations(['hide']),
        goBack() {
            this.$router.go(-1)
        },
        onSearch(val) {
            searchMovieAPI(val, this.cityLocation.id).then(data => {
                this.res = data
                console.log(val, this.res);
            }),
                searchCinemaAPI(val, this.cityLocation.id).then(data => {
                    this.cinema = data
                    console.log('cinema', this.cinema);
                })
        },
        onCancel() {
            console.log('取消');
            this.res = []
        }
    },
    computed: {
        ...mapState(['cityLocation'])
    },
}
</script>

<style lang="scss" scoped>
.search {
    // height: 811.6rem;
    background-color: var(--bg-black);

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
        }
    }

    .search-movie {
        width: 100%;
        height: 40rem;
        font-size: 15rem;
        line-height: 22rem;
        color: var(--movie-score-after);
        padding: 9rem 15rem 9rem 15rem;
        background-color: var(--bg-white);
    }

    .list {
        width: 100%;
        height: 349rem;
        padding-left: 15rem;
        border-top: 1rem solid var(--search-border);
        background-color: var(--bg-white);

        .movie-cell {
            width: 100%;
            height: 116rem;
            padding: 12rem 0;
            border-bottom: 1rem solid var(--search-border);
            display: flex;

            .poster {
                width: 64rem;
                height: 90rem;
                margin-right: 10rem;

                img {
                    width: 100%;
                    height: 100%;
                }
            }

            .text {
                width: 213rem;

                p {
                    height: 20rem;
                    overflow: hidden;
                    line-height: 20rem;
                    font-size: 13rem;
                    margin-top: 2rem;
                    color: var(--nav-black);
                }

                .name {
                    font-size: 17rem;
                    font-weight: bold;
                    color: var(--movie-name-black);
                    margin-top: 0;
                }
            }

            .score {
                height: 24rem;
                padding-left: 5rem;

                .movie-score {
                    font-size: 16rem;
                    color: var(--score-yellow);
                }

                .score-after {
                    font-size: 12rem;
                }
            }

        }
    }

    .more {
        color: var(--theme-color);
        text-align: center;
        line-height: 44rem;
        font-size: 15rem;
        width: 100%;
        height: 44rem;
        background-color: var(--bg-white);
    }

    .cinema-res {
        width: 100%;
        height: 40rem;
        font-size: 15rem;
        line-height: 22rem;
        color: var(--movie-score-after);
        padding: 9rem 15rem 9rem 15rem;
        background-color: var(--bg-white);
        margin-top: 10rem;
    }

    .cinema-list {
        width: 100%;
        // height: 221rem;
        border-top: 1rem solid var(--search-border);
        padding-left: 15rem;
        background-color: var(--bg-white);

        .list-item {
            width: 100%;
            height: 110rem;
            padding: 15rem 15rem 15rem 0;
            border-bottom: 1rem solid var(--search-border);

            .p-name-price {
                height: 25rem;
                line-height: 25rem;
                margin-bottom: 6rem;
            }

            .cinema-name {
                font-size: 16rem;
                color: #000;
            }

            .cinema-price {
                margin-left: 10rem;
                font-size: 17rem;
                color: var(--theme-color);

                .price-after {
                    font-size: 12rem;
                    color: var(--movie-score-after);
                }
            }

            .address {
                font-size: 13rem;
                height: 20rem;
                line-height: 20rem;
                color: var(--movie-score-after);
            }

            .tags {
                height: 21rem;
                margin-top: 7rem;
                line-height: 21rem;

                .tag {
                    height: 17rem;
                    padding: 0 3rem;
                    margin-right: 7rem;
                    color: var(--tag-border);
                    border: 1rem solid var(--tag-border);
                    border-radius: 3rem;
                }
            }
        }
    }

    .more-cinema {
        width: 100%;
        height: 44rem;
        line-height: 44rem;
        color: var(--theme-color);
        font-size: 15rem;
        text-align: center;
        background-color: var(--bg-white);
    }
}
</style>