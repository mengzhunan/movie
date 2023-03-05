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
                <div class="item">
                    <div class="item-poster" v-for="p in this.videoList" :key="p.id">
                        <img :src="p.video?.imgUrl" alt="">
                    </div>

                </div>
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
import { videoAPI } from '@/apis'

export default {
    data() {
        return {
            isShow: false,
            videoList: [],
            active: 0,
            videoID: [4, 1067226, 1331498, 1074953, 1307354]
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
    },
    mounted() {
        videoAPI(this.videoID[0]).then(data => {
            this.videoList = data.data.feeds
            console.log(this.videoList[0].video.imgUrl);
            console.log(this.videoList);
        })
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

.item {
    width: 100%;
    height: 247.2rem;

    .item-poster {
        height: 202.9rem;

        img {
            width: 100%;
            height: 100%;
        }

        .video-info {
            width: 100%;
            height: 50rem;
        }
    }

}
</style>