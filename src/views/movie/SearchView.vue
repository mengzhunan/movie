<template>
    <div class="search">
        <div class="navbar">
            <van-icon name="arrow-left" class="back" @click="goBack()" />
            <div class="navbar-title">猫眼电影</div>
            <div></div>
        </div>
        <form action="/">
            <van-search v-model="value" show-action placeholder="请输入搜索关键词" @search="onSearch" @cancel="onCancel" />
        </form>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
    data() {
        return {
            value: ''
        }
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
            console.log(val);
        },
        onCancel() {
            console.log('取消');
        }
    }
}
</script>

<style lang="scss" scoped>
.search {
    height: 811.6rem;
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
}
</style>