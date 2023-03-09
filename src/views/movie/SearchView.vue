<template>
    <div class="search">
        <div class="navbar">
            <van-icon name="arrow-left" class="back" @click="goBack()" />
            <div class="navbar-title">猫眼电影</div>
        </div>
        <form action="/">
            <van-search v-model="value" show-action placeholder="搜电影、搜影院" @search="onSearch" @cancel="onCancel"
                :clearable="false" style="border-bottom: 1rem solid var(--btn-border);" />
        </form>
        <div class="search-res" v-show="res.length > 1">
            <div class="search-movie">
                电影/电视剧/综艺
            </div>
            <div class="list">
                <div class="movie-cell" v-for="r in res.slice(0, 3)" :key="r.id" @click="$router.push(`/detail/${r.id}`)">
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
            <div class="more" @click="goToDetail(res)">
                查看全部{{ res.length }}部影视剧
            </div>
            <div v-show="this.cinema.length > 0">
                <div class="cinema-res">
                    影院
                </div>
                <div class="cinema-list">
                    <div class="list-item" v-for="c in this.cinema.slice(0, 2)" :key="c.id"
                        @click="$router.push(`/cinema/${c.id}`)">
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
                <div class="more-cinema" @click="goToCinemaDetail(cinema)">
                    查看全部{{ cinema.length }}家影院
                </div>
            </div>
        </div>
        <div v-show="!value" class="history" v-for="(h, i) in searchHistory" :key="i">
            <div class="clock">
                <van-icon name="clock-o" />
            </div>
            <div class="content" @click="search(h)">
                {{ h }}
            </div>
            <div class="delete" @click="deleteHistory(i)">
                <van-icon name="cross" />
            </div>
        </div>
        <van-empty image="search" description="没有找到相关内容" style="background-color: #fff;" v-show="res.length < 1 && value" />
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
            cinema: [],
            searchHistory: [],
            timer: null
        }
    },
    created() {
        if (!localStorage.history) {
            return
        }

        let history = JSON.parse(localStorage.history || "[]");
        this.searchHistory = history
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
            let history = JSON.parse(localStorage.history || "[]");
            history = [val, ...history.filter(v => v != val)]
            localStorage.history = JSON.stringify(history)
        },
        onCancel() {
            window.location.reload()
            this.res = []
        },
        search(h) {
            this.value = h
            this.onSearch(h)
        },
        deleteHistory(i) {
            console.log(i);
            // localStorage.removeItem('history')
            let arr = JSON.parse(localStorage.getItem('history'))
            arr.splice(i, 1)
            localStorage.setItem('history', JSON.stringify(arr))
            window.location.reload()
        },
        goToDetail(res) {

            this.$router.push({
                path: `/search/allmovie`,
                query: { content: JSON.stringify(res) }
            })
        },
        goToCinemaDetail(cinema) {
            this.$router.push({
                path: `/search/allcinema`,
                query: { content: JSON.stringify(cinema) }
            })
        }
    },
    computed: {
        ...mapState(['cityLocation'])
    },
}
</script>

<style lang="scss" scoped>
.search {
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
        border-top: 1rem solid var(--btn-border);
        background-color: var(--bg-white);

        .movie-cell {
            width: 100%;
            height: 116rem;
            padding: 12rem 0;
            border-bottom: 1rem solid var(--btn-border);
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
        border-top: 1rem solid var(--btn-border);
        padding-left: 15rem;
        background-color: var(--bg-white);

        .list-item {
            width: 100%;
            height: 110rem;
            padding: 15rem 15rem 15rem 0;
            border-bottom: 1rem solid var(--btn-border);

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
                overflow: hidden;
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

                .bg-yellow {
                    color: var(--score-yellow);
                    border: 1rem solid var(--score-yellow);
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

    .history {
        width: 360rem;
        height: 44rem;
        line-height: 44rem;
        margin-left: 15rem;
        border-bottom: 1rem solid #e5e5e5;
        display: flex;

        .clock {
            font-size: 15rem;
            margin-right: 10rem;
        }

        .content {
            width: 295rem;
            height: 44rem;
        }

        .delete {
            width: 40rem;
            text-align: center;
        }
    }
}
</style>