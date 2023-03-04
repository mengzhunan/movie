<template>
    <div>
        <div class="loading" v-if="loadingState">
            <img src="../../assets/image/loading.png" alt=""><span>正在加载...</span>
        </div>
        <div v-else>
            <div class="navbar">
                <van-icon name="arrow-left" class="back" @click="$router.go(-1)" />
                <div class="navbar-title">{{ movieDetail.nm }}</div>
                <van-icon class="icon" size="20rem" name="wap-nav" @click="showMore()" />
                <div class="showMore" v-show="isShow">
                    <a href="/" @click="hidden()" class="showMore-item">首页</a>
                    <a href="/board" class="showMore-item">榜单</a>
                    <a href="/" class="showMore-item">热点</a>
                    <a href="/" class="showMore-item">商城</a>
                </div>
            </div>

            <div class="app">
                <div class="logo"><img src="../../assets/image/logo.png" alt=""></div>
                <div class="text">19.9元起购票 |</div>
                <div class="download">打开APP
                    <van-icon name="arrow" />
                </div>
            </div>
            <div class="movie-detail" :style="{ 'background-color': movieDetail.backgroundColor }">
                <van-image lazy-load :src="movieDetail.img" class="detail-poster" />
                <div class="movie-text">
                    <p class="name">{{ movieDetail.nm }}</p>
                    <p class="ename">{{ movieDetail.enm }}</p>
                    <p class="wish">{{ movieDetail.wish }}人想看</p>
                    <p>{{ movieDetail.cat }}</p>
                    <p>{{ movieDetail.src }}/{{ movieDetail.episodeDur }}分钟</p>
                    <p>{{ movieDetail.onlineDate }}</p>
                </div>
                <van-icon name="arrow" class="goDetail" @click="$router.push(`/detail/${id}`)" />
            </div>
            <van-tabs>
                <van-tab :title="this.day + this.month + '月' + this.date + '日'">
                    123
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { movieDetailAPI } from '@/apis'

export default {
    props: ['id'],
    data() {
        return {
            isShow: false,
            movieDetail: [],
            loadingState: true,
            month: '',
            date: '',
            day: '',
        }
    },
    mounted() {
        this.hide();
        this.getDate();
        movieDetailAPI(this.id).then(data => {
            this.movieDetail = data.movie
            // console.log(this.movieDetail);
            this.loadingState = false
        })
    },
    methods: {
        ...mapMutations(['hide']),
        showMore() {
            if (this.isShow) {
                this.isShow = !this.isShow
            } else {
                this.isShow = !this.isShow
            }
        },
        getDate() {
            this.month = new Date().getMonth() + 1
            this.date = new Date().getDate()
            let week = new Date().getDay()
            if (week == 0) {
                this.day = '周日'
            } else if (week == 1) {
                this.day = '周一'
            } else if (week == 2) {
                this.day = '周二'
            } else if (week == 3) {
                this.day = '周三'
            } else if (week == 4) {
                this.day = '周四'
            } else if (week == 5) {
                this.day = '周五'
            } else if (week == 6) {
                this.day = '周六'
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@keyframes change-left {
    0% {
        transform: rotate(0deg)
    }

    50% {
        transform: rotate(-180deg)
    }

    100% {
        transform: rotate(-360deg);
    }
}

.loading {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14rem;
    padding: 10rem;

    img {
        animation: change-left 1s linear infinite;
        width: 22rem;
        height: 22rem;
        display: inline-block;
        margin-right: 4rem;
    }
}

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

.app {
    display: flex;
    width: 100%;
    height: 57.7rem;
    line-height: 57.7rem;
    flex-direction: row;

    .logo {
        width: 94rem;
        height: 39rem;
        margin: 10rem;

        img {
            width: 100%;
        }
    }

    .text {
        flex-grow: 1;
        color: var(--nav-black);
        font-weight: bold;
        font-size: 12.5rem;
        text-align: right;
        margin-right: 5rem;
    }

    .download {
        color: var(--download-color);
        font-weight: bold;
        font-size: 13.5rem;
    }
}

.movie-detail {
    width: 100%;
    height: 180.9rem;
    padding: 18.3rem 28.9rem 18.3rem 14.5rem;
    display: flex;
    position: relative;

    .detail-poster {
        width: 105.8rem;
        height: 144.3rem;

        img {
            height: 100%;
        }
    }

    .movie-text {
        color: var(--bg-white);
        height: 100%;
        flex: 1;
        margin-left: 12rem;

        p {
            margin-top: 10rem;
        }

        .name {
            font-weight: bold;
            font-size: 19.3rem;
            margin: 0;
        }

        .ename {
            font-size: 11.5rem;
        }

        .wish {
            color: var(--score-yellow);
            font-weight: bold;
            font-size: 17.4rem;
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
</style>