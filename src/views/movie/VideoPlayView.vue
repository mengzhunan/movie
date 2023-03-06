<template>
    <div>
        <video width="100%" height="208rem" controls="controls">
            <source :src="this.$route.query.content.video?.url" type="video/mp4" />
        </video>
        <div class="info-content">
            <div class="video-title">{{ this.$route.query.content?.title }}</div>
            <div class="user-info">
                <div class="user-pic">
                    <img :src="this.$route.query.content.user?.avatarurl" alt="">
                </div>
                <div class="user-text">{{ this.$route.query.content.user?.nickName }}</div>
                <div class="icon">
                    <img src="../../assets/image/renzheng.png" alt="">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
    data() {
        return {

        }
    },
    methods: {
        ...mapMutations(['hide']),
    },
    mounted() {
        this.hide();
        // console.log(this.$route.query.content);
    },
}
</script>

<style lang="scss" scoped>
.info-content {
    width: 375rem;
    height: 84rem;
    padding: 14rem 15rem 15rem 15rem;

    .video-title {
        width: 100%;
        height: 22rem;
        font-size: 15rem;
        line-height: 22rem;
        color: var(--nav-active-black);
    }

    .user-info {
        display: flex;
        align-items: center;
        margin-top: 8rem;

        .user-pic {
            width: 25rem;
            height: 25rem;

            img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
            }
        }

        .user-text {
            margin-left: 8rem;
            margin-right: 4rem;
        }

        .icon {
            width: 12rem;
            height: 12rem;

            img {
                width: 100%;
                height: 100%;
            }
        }
    }

}
</style>