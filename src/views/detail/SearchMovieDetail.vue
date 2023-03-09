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
            <div class="item" v-for="a in allMovie" :key="a.id" @click="$router.push(`/detail/${a.id}`)">
                <div class="poster">
                    <img :src="a.poster" alt="">
                </div>
                <div class="info">
                    <div class="name-info">
                        <div class="name">
                            {{ a.name }}
                        </div>
                        <div class="score" v-if="a.score">
                            {{ a.score }}
                            <div class="score-after">
                                分
                            </div>
                        </div>
                        <div class="no-score" v-else>
                            暂无评分
                        </div>
                    </div>
                    <p class="detail">{{ a.ename }}</p>
                    <p class="detail">{{ a.catogary }}</p>
                    <p class="detail">{{ a.release }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            isShow: false,
            allMovie: JSON.parse(this.$route.query.content)
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
        console.log(JSON.parse(this.$route.query.content));
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

    .item {
        width: 343rem;
        height: 115rem;
        padding: 12rem 0;
        border-bottom: 1rem solid var(--btn-border);
        display: flex;

        .poster {
            width: 64rem;
            height: 90rem;
            margin-right: 10rem;

            img {
                width: 100%;
                height: 100%;
            }
        }

        .info {
            flex: 1;
            position: relative;

            .name-info {
                height: 22rem;
                line-height: 22rem;
                display: flex;

                .name {
                    max-width: 204rem;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    font-size: 17rem;
                    font-weight: bold;
                    color: var(--movie-name-black);
                }
            }

            .score {
                display: flex;
                position: absolute;
                padding-left: 5rem;
                right: 10rem;
                font-size: 16rem;
                color: var(--score-yellow);

                .score-after {
                    font-size: 12rem;
                }
            }

            .no-score {
                padding-left: 5rem;
                position: absolute;
                right: 10rem;
            }

            .detail {
                height: 17rem;
                line-height: 17rem;
                max-width: 204rem;
                margin-top: 2rem;
                font-size: 13rem;
                color: var(--nav-black);
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }

        }
    }
}
</style>