<template>
    <div class="videos">
        <div class="top">
            <div class="name">视频推荐</div>
            <div class="txt">全部<van-icon name="arrow" /></div>
        </div>
        <div class="roll-wrapper">
            <div class="roll-content">
                <div class="actor" v-for="(m, i) in v.feeds" :key="i" @click="play(m.video)">
                    <div class="cover">
                        <van-image lazy-load :src="m.shareInfo.img" radius="8rem" class="auto-img" />
                        <van-icon class="icon" color="#fff" size="30rem" name="play-circle" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['v'],

    methods: {
        play(event) {
            console.log(event, event.url);
        }
    }
}
</script>

<style lang="scss" scoped>
.video {
    margin-top: 18rem 0;
}

.top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10rem 0 15rem 0;

    .name {
        font-size: 15rem;
        color: #fff;
    }

    .txt {
        font-size: 12rem;
        color: var(--text-grey);
    }
}

.roll-wrapper {
    width: 100%;
    overflow: auto;
}

.roll-content {
    display: flex;
    flex-wrap: nowrap;
}

.actor {
    margin-right: 10rem;
    flex-shrink: 1;

    .cover {
        height: 94rem;
        width: 140rem;
        margin-bottom: 6rem;
        position: relative;

        .auto-img {
            width: 100%;
            height: 100%;
            display: block;
        }

        .icon {
            position: absolute;
            z-index: 2;
            left: 40%;
            top: 34%;
        }
    }
}
</style>