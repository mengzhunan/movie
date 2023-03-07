<template>
    <div>
        <div class="navbar">
            <div class="navbar-title">猫眼电影</div>
            <van-icon class="icon" size="20rem" name="wap-nav" @click="showMore()" />
            <div class="showMore" v-show="isShow">
                <a href="/" class="showMore-item">首页</a>
                <a href="/board" class="showMore-item">榜单</a>
                <a href="/hot" class="showMore-item">热点</a>
                <a href="/shopping" class="showMore-item">商城</a>
            </div>
        </div>
        <van-list class="nav" v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad"
            style="display: flex; flex-wrap: wrap;">
            <van-cell v-for="s in this.shortVideoList" :key="s.id" style="padding:0; width: 185rem;">
                <div class="content" @click="goToDeatil(s)">
                    <div class="item">
                        <img :src="s.shareInfo.img" alt="">
                        <div class="video-title">{{ s.title }}</div>
                        <div class="video-info">
                            <div class="user-pic">
                                <img :src="s.user.avatarurl" alt="">
                            </div>
                            <div class="user-nickname">
                                {{ s.user.nickName }}
                            </div>
                            <div class="up">
                                <van-icon name="good-job-o" />
                            </div>
                            <div class="up-count">
                                {{ s.upCount }}
                            </div>
                        </div>
                    </div>
                </div>
            </van-cell>
        </van-list>
    </div>
</template>

<script>
import { shortVideoAPI } from '@/apis/index'
import { mapMutations } from 'vuex'

export default {
    data() {
        return {
            isShow: false,
            shortVideoList: [],
            offset: 0,
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
        onLoad() {
            this.offset += 10
            shortVideoAPI(this.offset, this.type).then(data => {

                this.shortVideoList = [...this.shortVideoList, ...data.data.feeds]
                this.loading = false;

                if (this.offset >= 100) {
                    this.finished = true;
                }
            })
        },
        ...mapMutations(['show']),
        goToDeatil(s) {
            this.$router.push({
                path: `/shortvideo/${s.id}`,
                query: { content: s }
            })
        }
    },
    mounted() {
        shortVideoAPI(this.offset).then(data => {
            this.shortVideoList = data.data.feeds
            // console.log(this.shortVideoList);
        }),
            this.show()
    }
}
</script>

<style lang="scss">
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
    width: 100%;

    .van-list__finished-text {
        width: 100%;
    }
}

.content {
    display: flex;
    flex-wrap: wrap;

    .item {
        width: 185rem;
        height: 300rem;
        margin: 0 2rem 2rem 0;
        position: relative;

        img {
            width: 100%;
            height: 100%;
        }

        .video-title {
            width: 170rem;
            height: 42rem;
            margin: 0 8rem 0 8rem;
            position: absolute;
            bottom: 41rem;
            overflow: hidden;
            color: var(--bg-white);
            font-size: 15rem;
            line-height: 21rem;
        }

        .video-info {
            width: 170rem;
            height: 21rem;
            margin: 0 8rem 0 8rem;
            display: flex;
            position: absolute;
            bottom: 14rem;

            .user-pic {
                width: 21rem;
                height: 21rem;

                img {
                    width: 100%;
                    border-radius: 50%;
                }
            }

            .user-nickname {
                width: 78rem;
                color: var(--bg-white);
                font-size: 13rem;
                line-height: 21rem;
                margin: 0 6rem 0 6rem;
            }

            .up {
                font-size: 18rem;
                margin-right: 3rem;
                color: var(--bg-white);
            }

            .up-count {
                color: var(--bg-white);
                font-size: 14rem;
                line-height: 21rem;
            }
        }
    }
}
</style>