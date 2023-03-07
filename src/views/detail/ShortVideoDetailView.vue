<template>
    <div>
        <div class="navbar">
            <van-icon name="arrow-left" class="back" @click="$router.go(-1)" />
            <div class="navbar-title">猫眼电影</div>
            <div></div>
        </div>
        <div class="short-video">
            <img :src="this.$route.query.content.shareInfo.img" alt="">
            <div class="play-btn">
                <img src="../../assets/image/play.png" alt="">
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
    methods: {
        ...mapMutations(['hide']),
    },
    mounted() {
        this.hide();
        console.log(this.$route.query);
    }

}
</script>

<style lang="scss" scoped>
.short-video {
    width: 100%;
    height: 615rem;

    img {
        width: 100%;
        height: 100%;
    }

    .play-btn {
        width: 60rem;
        height: 60rem;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -30rem;
        margin-top: -30rem;

        img {
            width: 100%;
            height: 100%;
        }
    }
}
</style>