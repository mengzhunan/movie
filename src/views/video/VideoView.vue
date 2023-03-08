<template>
    <div>
        <div class="navbar">
            <div class="navbar-title">猫眼电影</div>
            <van-icon class="icon" size="20rem" name="wap-nav" @click="showMore()" />
            <div class="showMore" v-show="isShow">
                <router-link to="/" class="showMore-item">首页</router-link>
                <router-link to="/board" class="showMore-item">榜单</router-link>
                <router-link to="/hot" class="showMore-item">热点</router-link>
                <router-link to="/shopping" class="showMore-item">商城</router-link>
            </div>
        </div>
        <van-tabs v-model="active">
            <van-tab title="推荐">
                <VideoDetail :type=0 />
            </van-tab>
            <van-tab title="热片解读">
                <VideoDetail :type=1331498 />
            </van-tab>
            <van-tab title="新片预告">
                <VideoDetail :type=1067226 />
            </van-tab>
            <van-tab title="速看电影">
                <VideoDetail :type=1074953 />
            </van-tab>
            <van-tab title="剧集综艺">
                <VideoDetail :type=1307354 />
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
import VideoDetail from '@/components/detail/VideoDetail.vue';
import { mapMutations } from 'vuex'

export default {
    components: { VideoDetail },
    data() {
        return {
            isShow: false,
            active: 0,
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
        ...mapMutations(['show']),
    },
    mounted() {
        this.show()
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
</style>