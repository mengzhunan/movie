<template>
    <div class="stay-movie">
        <div class="most-expected">
            <p class="title">近期最受期待</p>
            <div class="roll-wrapper">
                <div class="roll-content">
                    <div class="movie" v-for="m in stayMovie" :key="m.id" @click="$router.push(`/detail/${m.id}`)">
                        <div class="cover">
                            <van-image lazy-load :src="m.img" alt="" class="auto-img" />
                            <div class="score">{{ m.wish }} 人想看</div>
                        </div>
                        <div class="name">{{ m.nm }}</div>
                        <div class="time">{{ m.comingTitle }}</div>
                    </div>
                </div>
            </div>
        </div>

        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-cell v-for="(v, i) in stayMovieList" :key="i" @click="$router.push(`/detail/${v.id}`)">
                <div class="list-poster">
                    <img :src="v.img" alt="">
                </div>
                <div class="list-detail">
                    <p class="name">{{ v.nm }}</p>
                    <span class="wish">{{ v.wish }}</span>
                    <span>人想看</span>
                    <p>主演:{{ v.star }}</p>
                    <p>{{ v.rt }} 上映</p>
                </div>
                <div class="btn">
                    <button :class="bgColor(v)" @click="$router.push(`/buy/${v.id}`)">{{ v.showStateButton?.content ?
                        v.showStateButton?.content
                        : '想看'
                    }}</button>
                </div>
            </van-cell>
        </van-list>
    </div>
</template>

<script>
import { mostExpectedMovieAPI, stayMovieListAPI, moreStayMovieAPI } from '@/apis';
export default {
    data() {
        return {
            stayMovie: [],
            stayMovieList: [],
            stayMovieIds: [],
            loading: false,
            finished: false,
        }
    },
    mounted() {
        mostExpectedMovieAPI().then(data => {
            this.stayMovie = data.coming
        })
        stayMovieListAPI().then(data => {
            this.stayMovieList = data.coming
            this.stayMovieIds = data.movieIds
        })
    },
    methods: {
        onLoad() {
            let id = (this.stayMovieIds.slice(this.stayMovieList.length, this.stayMovieList.length + 10)).join(',')

            moreStayMovieAPI(id).then(data => {
                this.stayMovieList = [...this.stayMovieList, ...data.coming]

                this.loading = false;

                if (this.stayMovieList.length >= this.stayMovieIds.length) {
                    this.finished = true;
                }
            })
        },
        bgColor(v) {
            if (v.showStateButton?.content == '预售') {
                return 'bg-blue'
            } else if (v.showStateButton?.content == '购票') {
                return 'bg-red'
            }
            return 'bg-yellow'

        },
    },

}
</script>

<style lang="scss" scoped>
::-webkit-scrollbar {
    display: none;
}

.stay-movie {
    background-color: var(--bg-white);

    .most-expected {
        width: 375.2rem;
        height: 214.6rem;
        padding: 11.6rem 14.5rem;

        .title {
            width: 100%;
            height: 20.2rem;
            line-height: 20.2rem;
            font-size: 13.4rem;
            margin-bottom: 11.6rem;
        }

        .roll-wrapper {
            width: 100%;
            height: 160rem;
            overflow: auto;
        }

        .roll-content {
            display: flex;
            flex-wrap: nowrap;
        }

        .movie {
            margin-right: 10rem;
            flex-shrink: 1;

            .cover {
                height: 115rem;
                width: 85rem;
                margin-bottom: 6rem;
                position: relative;

                .auto-img {
                    width: 100%;
                    height: 100%;
                    display: block;
                }

                .score {
                    position: absolute;
                    z-index: 3;
                    color: var(--score-yellow);
                    font-size: 12rem;
                    font-weight: 600;
                    left: 2rem;
                    bottom: 6rem;
                }

                &::after {
                    display: inline-block;
                    position: absolute;
                    content: '';
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: 35rem;
                    background-image: linear-gradient(-180deg, rgba(77, 77, 77, 0), #000)
                }
            }

            .name {
                width: 85rem;
                height: 20rem;
                font-weight: bold;
                color: var(--movie-name-black);
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                margin-bottom: 3rem;
            }
        }
    }

    .van-cell__value--alone {
        display: flex;
        align-items: center;
    }

    .van-list {
        margin-bottom: 50rem;
    }

    .list-poster {
        width: 61.6rem;
        height: 86.6rem;
        margin-right: 13rem;

        img {
            width: 100%;
        }
    }

    .list-detail {
        width: 215rem;
    }

    .name {
        font-size: 16.4rem;
        font-weight: bold;
        color: var(--nav-active-black);
    }

    .wish {
        font-size: 14.4rem;
        font-weight: bold;
        color: var(--score-yellow);
    }

    .btn {

        button {
            width: 54rem;
            height: 28rem;
            border: none;
            color: var(--bg-white);
            border-radius: 20rem;
        }
    }

    .bg-blue {
        background-color: var(--btn-bg-blue);
    }

    .bg-yellow {
        background-color: var(--score-yellow);
    }

    .bg-red {
        background-color: var(--tab-active);
    }
}
</style>