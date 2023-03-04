<template>
    <div>
        <div class="cell-item" @click="$router.push(`/detail/${m.id}`)">
            <div class="cover">
                <van-image lazy-load :src="m.img" alt="" class="auto-img" />
            </div>
            <div class="content-wrapper">
                <div class="content">
                    <div class="name van-ellipsis">
                        {{ m.nm }}<span v-if="m.version" class="sion" :class="movieVersion"></span>
                    </div>
                    <div class="score" v-html="score" v-if="state"></div>
                    <div class="score" v-else><span class="wish">{{ m.wish }}</span>人想看</div>
                    <div class="star van-ellipsis">主演:{{ m.star }}</div>
                    <div class="show">{{ m.showInfo }}</div>
                </div>
                <div class="but" :class="bgColor" @click.stop="ticket" @click="$router.push(`/buy/${m.id}`)">
                    <div class="but-content">{{ m.showStateButton?.content }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    props: ['m'],

    methods: {

        ticket() {
            console.log('购票');
        }
    },

    computed: {
        score() {
            if (this.m.sc == 0) {
                return '<div>暂无评分</div>';
            }
            return `观众评 <span class="sc" style="color:var(--score-yellow);font-size: 16rem;font-weight: 700;">${this.m.sc}</span>`
        },

        bgColor() {
            if (this.m.showStateButton?.content == '预售') {
                return 'bg-blue'
            }
            return 'bg-red';
        },

        movieVersion() {
            return this.m.version.replace(' ', '-');
        },

        state() {
            if (this.m.showStateButton?.content == '预售') {
                return false
            }
            return true
        }
    }
}
</script>

<style lang="scss" scoped>
.cell-item {
    display: flex;
}

.cover {
    flex-shrink: 0;
    width: 64rem;
    height: 90rem;
    margin-right: 10rem;

    .auto-img {
        width: 100%;
        height: 100%;
        display: block;
    }
}

.content-wrapper {
    flex: 1;
    display: flex;
    align-items: center;

    .content {
        width: 220rem;
        flex: 1;

        .score,
        .star,
        .show {
            font-size: 13rem;
            color: var(--tab-inactive);
        }

        .wish {
            color: var(--score-yellow);
            font-size: 16rem;
            font-weight: 700;
        }

    }

    .name {
        position: relative;
        width: 200rem;
        font-size: 18rem;
        font-weight: 900;
        color: var(--nav-active-black);

        .sion {
            position: absolute;
            top: 4rem;
            margin-left: 4rem;
            display: inline-block;

            &.v2d-imax {
                width: 44rem;
                height: 14rem;
                background-size: 100%;
                background-image: url('@/assets/image/v2dimax.png');
            }

            &.v3d-imax {
                width: 44rem;
                height: 14rem;
                background-size: 100%;
                background-image: url('@/assets/image/v3dimax.png');
            }

            &.v3d {
                width: 18rem;
                height: 14rem;
                background-size: 100%;
                background-image: url('@/assets/image/v3d.png');
            }
        }
    }

    .but {
        width: 54rem auto;
        border-radius: 20rem;

        &.bg-red {
            background-color: var(--tab-active);
            box-shadow: 0 0.04rem 0.04rem 0 rgb(240 61 55 / 15%);
        }

        &.bg-blue {
            background-color: var(--btn-bg-blue);
            box-shadow: 0 0.04rem 0.04rem 0 rgb(60 159 230 / 15%);
        }

        .but-content {
            font-size: 12rem;
            padding: 0 12rem;
            font-weight: 500;
            color: #fff;
        }
    }
}
</style>