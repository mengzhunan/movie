<template>
    <div>
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
                            <div class="play-btn" @click="goToDeatil(p)">
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
    </div>
</template>

<script>
import { videoAPI, moreVideoAPI } from '@/apis/index'

export default {
    props: ['type'],
    data() {
        return {
            videoList: [],
            offset: 0,
            loading: false,
            finished: false,
        }
    },
    methods: {
        // format(num) {
        //     return '0'.repeat(2 - String(Math.floor(num / 60)).length) + Math.floor(num / 60) + ':' + '0'.repeat(2 - String(Math.floor(num % 60)).length) + Math.floor(num % 60)
        // },
        onLoad() {
            this.offset += 10
            moreVideoAPI(this.offset, this.type).then(data => {

                this.videoList = [...this.videoList, ...data.data.feeds]
                this.loading = false;

                if (this.offset >= 100) {
                    this.finished = true;
                }
            })
        },
        goToDeatil(p) {
            this.$router.push({
                path: `/video/${p.id}`,
                query: { content: p }
            })
        }
    },
    mounted() {
        videoAPI(this.type).then(data => {
            this.videoList = data.data.feeds
            // console.log(data.data.feeds);
        })
    },

}
</script>

<style lang="scss" scoped>
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
            // height: 24rem;
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