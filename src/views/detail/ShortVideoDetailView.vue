<template>
    <div>
        <div class="navbar">
            <van-icon name="arrow-left" class="back" @click="$router.go(-1)" />
            <div class="navbar-title">猫眼电影</div>
            <div></div>
        </div>
        <div class="short-video">
            <video width="100%" height="100%" controls="controls" autoplay="autoplay">
                <source :src="this.$route.query.content.video?.url" type="video/mp4" />
            </video>
            <div class="wrapper">
                <div class="header-pic">
                    <img :src="this.$route.query.content.user.avatarurl" alt="">
                </div>
                <div class="up">
                    <van-icon name="good-job" class="icon" />
                </div>
                <div class="text">
                    {{ this.$route.query.content.upCount }}
                </div>
                <div class="comment">
                    <van-icon name="chat" class="icon" />
                </div>
                <div class="text">
                    评论
                </div>
                <div class="share">
                    <van-icon name="share" class="icon" />
                </div>
                <div class="text">
                    分享
                </div>
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
    height: calc(100vh - 52rem);

    .wrapper {
        width: 48rem;
        height: 327rem;
        position: absolute;
        right: 15rem;
        bottom: 60rem;
        text-align: center;

        .header-pic {
            width: 48rem;
            height: 48rem;
            border-radius: 50%;
            overflow: hidden;
            margin-bottom: 26rem;

            img {
                width: 100%;
            }
        }

        .up {
            width: 48rem;
            height: 48rem;
            line-height: 55rem;
            border-radius: 50%;
            color: var(--bg-white);
            background: rgba(0, 0, 0, .42);
            margin-bottom: 4rem;

            .icon {
                font-size: 21rem;
            }
        }

        .text {
            width: 48rem;
            height: 21rem;
            color: var(--bg-white);
            line-height: 21rem;
            font-size: 14rem;
            margin-bottom: 14rem;
        }

        .comment {
            width: 48rem;
            height: 48rem;
            line-height: 55rem;
            border-radius: 50%;
            color: var(--bg-white);
            background: rgba(0, 0, 0, .42);
            margin-bottom: 4rem;

            .icon {
                font-size: 21rem;
            }
        }

        .share {
            width: 48rem;
            height: 48rem;
            line-height: 55rem;
            border-radius: 50%;
            color: var(--bg-white);
            background: rgba(0, 0, 0, .42);
            margin-bottom: 4rem;

            .icon {
                font-size: 21rem;
            }
        }

    }
}
</style>