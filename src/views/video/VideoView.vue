<template>
    <div>
        <div class="navbar">
            <div class="navbar-title">猫眼电影</div>
            <van-icon class="icon" size="20rem" name="wap-nav" @click="showMore()" />
            <div class="showMore" v-show="isShow">
                <a href="/" @click="hidden()" class="showMore-item">首页</a>
                <a href="/board" class="showMore-item">榜单</a>
                <a href="/hot" class="showMore-item">热点</a>
                <a href="/shopping" class="showMore-item">商城</a>
            </div>
        </div>
        <van-tabs v-model="active">
            <van-tab title="推荐">
                <van-list class="nav" v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
                    <van-cell v-for="p in this.videoList" :key="p.id" style="padding:0; ">
                        <div class=" item">
                            <div class="item-poster">
                                <div class="poster">
                                    <img :src="p.video?.imgUrl" alt="">
                                    <div class="video-title">{{ p.shareInfo?.title }}</div>
                                    <div class="info-bar">
                                        <!-- <div class="time">{{ format(p.video.dur) }}</div> -->
                                    </div>
                                    <div class="play-btn" @click="$router.push(`/video/${p.id}`)">
                                        <img src="../../assets/image/play.png" alt="">
                                    </div>
                                </div>
                                <div class="video-info">
                                    <div class="user-info">
                                        <div class="user-img">
                                            <img :src="p.user?.avatarurl" alt="">
                                        </div>
                                        <div class="user-nickname">{{ p.user?.nickName }}</div>
                                    </div>
                                    <div class="comment">
                                        <div class="up-count">
                                            <van-icon name="good-job-o" class="icon" />
                                            {{ p.upCount }}
                                        </div>
                                        <div class="comment-count">
                                            <van-icon name="chat-o" class="icon" />
                                            {{ p.commentCount }}
                                        </div>
                                        <div class="share">
                                            <van-icon name="share-o" class="icon" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </van-cell>
                </van-list>
            </van-tab>
            <van-tab title="热片解读">

            </van-tab>
            <van-tab title="新片预告">

            </van-tab>
            <van-tab title="速看电影">

            </van-tab>
            <van-tab title="剧集综艺">

            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
import { videoAPI, moreVideoAPI } from '@/apis/index'

export default {
    data() {
        return {
            isShow: false,
            videoList: [],
            offset: 0,
            active: 0,
            loading: false,
            finished: false,
        }
    },
    methods: {
        showMore() {
            if (this.isShow) {
                this.isShow = !this.isShow
            } else {
                this.isShow = !this.isShow
            }
        },
        // format(num) {
        //     return '0'.repeat(2 - String(Math.floor(num / 60)).length) + Math.floor(num / 60) + ':' + '0'.repeat(2 - String(Math.floor(num % 60)).length) + Math.floor(num % 60)
        // },
        onLoad() {
            this.offset += 10
            moreVideoAPI(this.offset).then(data => {

                this.videoList = [...this.videoList, ...data.data.feeds]
                this.loading = false;

                if (this.offset >= 100) {
                    this.finished = true;
                }
            })
        }
    },
    mounted() {
        videoAPI().then(data => {
            this.videoList = data.data.feeds
        })
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

.nav {
    margin-bottom: 50rem;
}

.van-cell__value--alone {
    height: 267rem;
}

.item {
    width: 100%;
    height: 247.2rem;

    .poster {
        height: 221rem;
        position: relative;

        img {
            width: 100%;
            height: 100%;
        }

        .video-title {
            height: 24rem;
            margin: 9rem 15rem 19rem 15rem;
            font-size: 17rem;
            color: var(--bg-white);
            text-shadow: 1px 1px 2px var(--bg-black);
            position: absolute;
            top: 0;
        }

        .info-bar {
            position: absolute;
            left: 0;
            bottom: 0;
            right: 0;
            height: 30px;
            line-height: 30px;
            background: linear-gradient(180deg, transparent, rgba(0, 0, 0, .5));
            color: #fff;
            font-size: 12px;

            .time {
                width: 30rem;
                height: 30rem;
                margin-right: 10rem;
                position: absolute;
                right: 0;
            }
        }

        .play-btn {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 58rem;
            height: 58rem;
            margin-left: -29rem;
            margin-top: -29rem;

            img {
                width: 100%;
                height: 100%;
            }
        }
    }

    .video-info {
        width: 100%;
        height: 46rem;
        display: flex;
        justify-content: space-between;
        padding-left: 15rem;


        .user-info {
            width: 100rem;
            height: 100%;
            display: flex;
            align-items: center;

            .user-img {
                width: 22rem;
                height: 22rem;

                img {
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                }
            }

            .user-nickname {
                margin-left: 8rem;
                font-size: 14rem;
                color: var(--nav--black);
            }
        }

        .comment {
            display: flex;
            align-items: center;
            font-size: 12rem;
            color: var(--nav-black);

            .icon {
                font-size: 20rem;
            }

            .up-count {
                margin-right: 26rem;
            }

            .comment-count {
                margin-right: 26rem;
            }
        }

        .comment {
            width: 161rem;
            height: 100%;
        }
    }
}
</style>