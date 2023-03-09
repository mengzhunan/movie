<template>
    <div>
        <div class="navbar">
            <van-icon name="arrow-left" class="back" @click="$router.go(-1)" />
            <div class="navbar-title">猫眼电影</div>
            <van-icon class="icon" size="20rem" name="wap-nav" @click="showMore()" />
            <div class="showMore" v-show="isShow">
                <router-link to="/" class="showMore-item">首页</router-link>
                <router-link to="/board" class="showMore-item">榜单</router-link>
                <router-link to="/hot" class="showMore-item">热点</router-link>
                <router-link to="/shopping" class="showMore-item">商城</router-link>
            </div>
        </div>
        <div class="list">
            <div class="item" v-for="c in cinema" :key="c.id">
                <div class="info">
                    <div class="name-info">
                        <div class="name">{{ c.info.name }}</div>
                        <div class="price-info">
                            <span class="price">{{ c.info.price }}</span>
                            <span class="price-after">元起</span>
                        </div>
                    </div>
                    <p class="address">{{ c.info.address }}</p>
                    <p class="tags">
                        <span v-for="(t, i) in c.info.tags" :key="i">
                            {{ t }}
                        </span>
                    </p>
                </div>
                <div class="position">{{ c.distance }}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isShow: false,
            cinema: JSON.parse(this.$route.query.content)
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
    },
    mounted() {
        console.log(this.cinema);
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

.list {
    width: 100%;
    padding: 0 16rem;
    margin-bottom: 10rem;

    .item {
        width: 343rem;
        height: 102rem;
        display: flex;
        align-items: center;
        padding: 15rem 15rem 15rem 0;

        .info {
            width: 282rem;
            height: 100%;

            .name-info {
                display: flex;
                margin-bottom: 6rem;

                .name {
                    height: 22rem;
                    line-height: 22rem;
                    max-width: 225rem;
                    font-size: 16rem;
                    color: #000;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
            }

            .price-info {
                margin-left: 10rem;
                line-height: 22rem;

                .price {
                    font-size: 17rem;
                    color: var(--theme-color);
                }

                .price-after {
                    color: var(--movie-score-after);
                }
            }

            .address {
                height: 17rem;
                line-height: 17rem;
                font-size: 13rem;
                color: var(--movie-score-after);
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }

            .tags {
                height: 19rem;
                line-height: 19rem;
                margin-top: 7rem;

                span {
                    color: var(--tag-border);
                    border: 1rem solid var(--tag-border);
                    padding: 0 3rem;
                    margin-right: 5rem;
                    border-radius: 3rem;
                }
            }
        }

        .position {
            flex: 1;
            font-size: 13rem;
            color: var(--movie-score-after);
        }
    }
}
</style>