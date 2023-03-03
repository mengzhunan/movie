<template>
    <div>
        <div class="navbar">
            <van-icon name="arrow-left" class="back" @click="$router.go(-1)" />
            <div class="navbar-title">影视快讯</div>
            <van-icon class="icon" size="20rem" name="wap-nav" @click="showMore()" />
            <div class="showMore" v-show="isShow">
                <a href="/" @click="hidden()" class="showMore-item">首页</a>
                <a href="/board" class="showMore-item">榜单</a>
                <a href="/hot" class="showMore-item">热点</a>
                <a href="/" class="showMore-item">商城</a>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
    data() {
        return {
            isShow: false,
        }
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
    },
    mounted() {
        this.hide();
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
</style>