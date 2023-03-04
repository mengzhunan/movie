<template>
    <div class="movie-info">
        <div class="loading" v-if="loadingState">
            <img src="../../assets/image/loading.png" alt=""><span>正在加载...</span>
        </div>

        <div v-else class="movie-content" :style="{ 'background-color': movieDetail.backgroundColor }">
            <div class="nav">
                <span @click="$router.go(-1)">猫眼电影</span> > <span>{{ movieDetail.nm }}</span>
            </div>
            <div class="movie-info-top">
                <div class="movie-cover">
                    <van-image lazy-load :src="movieDetail.img" alt="" class="auto-img" />
                </div>
                <div class="movie-desc">
                    <div class="name">{{ movieDetail.nm }}</div>
                    <div class="movie-desc-top">
                        <div class="name-eg">{{ movieDetail.enm }}</div>
                        <div class="info">
                            <div class="type">{{ movieDetail.cat }}</div>
                            <div class="actors">{{ movieDetail.star }}</div>
                            <div class="time">{{ movieDetail.onlineDate }}/{{ movieDetail.episodeDur }}分钟</div>
                        </div>
                    </div>
                    <div class="btns"><van-icon class="icon" name="like-o" />想看</div>
                </div>
            </div>

            <div class="movie-mouth" v-if="(movieDetail.sc == 0)">
                <div class="top look">
                    <div class="logo">
                        <img src="../../assets/image/logo-new.png" alt="">
                        <div>猫眼想看</div>
                    </div>
                </div>
                <div class="score">
                    <div class="w">{{ movieDetail.wish }} <span class="txt">人想看</span></div>
                </div>
            </div>

            <div class="movie-mouth" v-else>
                <div class="top">
                    <div class="logo">
                        <img src="../../assets/image/logo-new.png" alt="">
                        <div>猫眼购票评分</div>
                    </div>
                    <div class="wish">{{ data.realtime.wish }}人想看</div>
                    <div class="watched">{{ data.realtime.watched }}人看过</div>
                </div>
                <div class="score">
                    <div class="sc">
                        <div>{{ movieDetail.sc }}</div>
                        <div>{{ movieDetail.snum }}人评</div>
                    </div>
                    <van-rate v-model="value" :size="6" gutter="10rem" color="#ffd21e" allow-half void-icon="star"
                        void-color="#eee" />
                </div>
            </div>

            <!-- 简介 -->
            <div class="intro">
                <div class="top">
                    <div class="txt">简介</div>
                    <div class="open" v-show="open" @click=condition>展开<van-icon name="arrow-down" /></div>
                    <div class="open" v-show="!open" @click=condition>收起<van-icon name="arrow-up" /></div>
                </div>
                <div class="content" v-show="!open">{{ movieDetail.dra }}</div>
                <div class="content hidden" v-show="open">{{ movieDetail.dra }}</div>
            </div>

            <!-- 演职人员 -->
            <CastMember :actor="data.celebrities" />
            <!-- 视频推荐 -->
            <VideoRecommendation :v="data.feedVideos" />
        </div>


    </div>
</template>
<script>
import { mapMutations } from 'vuex'
import { movieDetailAPI } from '@/apis';
import CastMember from '@/components/detail/CastMember.vue'
import VideoRecommendation from '@/components/detail/VideoRecommendation.vue'

export default {
    props: ['id'],
    components: {
        CastMember,
        VideoRecommendation
    },
    data() {
        return {
            data: {},
            movieDetail: {},
            value: 0,
            loadingState: true,
            open: true
        }
    },

    mounted() {
        this.hide();
        movieDetailAPI(this.id).then(data => {
            this.data = data
            this.movieDetail = data.movie
            this.value = (data.movie.sc / 2)
            this.loadingState = false
        })
    },

    methods: {
        ...mapMutations(['hide']),

        condition() {
            this.open = !this.open
        }
    },

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

.nav {
    color: var(--text-grey);
    font-size: 14rem;
    margin-bottom: 15rem;
}

.movie-content {
    padding: 20rem 16rem;
}

.movie-info-top {
    display: flex;
}

.movie-cover {
    width: 100rem;
    height: 138rem;

    .auto-img {
        width: 100%;
        height: 100%;
        display: block;
    }
}

.movie-desc {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 12rem;
    color: #fff;

    .name {
        font-size: 20rem;
        font-weight: 700;
        margin-bottom: 10rem;
    }

    .movie-desc-top {
        flex: 1;
        font-size: 12rem;
        line-height: 18rem;
        color: var(--text-grey);
    }
}

.btns {
    width: 110rem;
    height: 30rem;
    line-height: 30rem;
    font-size: 12rem;
    background: hsla(0, 0%, 100%, .35);
    box-shadow: 0 0.02rem 0.08rem 0 rgb(0 0 0 / 10%);
    border-radius: 4rem;
    text-align: center;

    .icon {
        margin-right: 4rem;
    }
}

.movie-mouth {
    height: 110rem;
    border-radius: 8rem;
    margin-top: 15rem;
    padding: 10rem 10rem 10rem 0;
    background-color: rgba(0, 0, 0, .18);

    .top {
        display: flex;
        justify-content: space-around;
        align-items: center;
        font-size: 12rem;
        color: var(--text-grey);

        &.look {
            margin-left: 10rem;
            justify-content: space-between;
        }

        img {
            width: 16rem;
            height: 16rem;
            margin-right: 4rem;
        }

        .logo {
            display: flex;
            align-items: center;
            color: #fff;
        }
    }

    .score {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 10rem 0;

        .w {
            margin-top: 10rem;
            color: var(--score-yellow);
            font-size: 26rem;
            font-weight: 700;
        }

        .txt {
            color: #fff;
            font-size: 12rem;
        }

        .sc {
            text-align: right;
            margin-right: 10rem;

            >div:nth-child(1) {
                color: var(--score-yellow);
                padding: 6rem 0;
                font-size: 20rem;
                font-weight: 700;
            }

            >div:nth-child(2) {
                color: var(--text-grey);
                font-size: 14rem;
            }
        }
    }
}

.intro {
    color: #fff;
    padding: 16rem 0 0;

    .top {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .txt {
            font-size: 15rem;
        }

        .open {
            color: var(--text-grey);
            font-size: 12rem;
        }
    }

    .content {
        margin: 8rem 0;
        font-size: 15rem;
        line-height: 24rem;

        &.hidden {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            text-overflow: ellipsis;
            overflow: hidden;
        }
    }
}
</style>