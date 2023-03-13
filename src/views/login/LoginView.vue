<template>
    <div>
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="h in m" :key="h.id">
                <div class="box">
                    <img :src="h.img" alt="">
                </div>
            </van-swipe-item>
        </van-swipe>
    </div>
</template>

<script>

import { mapMutations } from 'vuex';
import { cinemaMovieListAPI } from '@/apis/index'

export default {
    data() {
        return {
            m: [],
        };
    },

    mounted() {
        cinemaMovieListAPI(204, 20).then((res) => {
            console.log(res);
            let { data } = res
            console.log(data.movies);
            this.m = data.movies
        })
    },

    created() {
        this.hide();
    },

    methods: {
        ...mapMutations(['hide']),

    }

}
</script>

<style lang="scss" scoped>
.my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;

    .box{
        width: 120rem;
        height: 240rem;

        img{
            width: 100%;
            height: 100%;
            display: block;
        }
    }
}
</style>