<template>
    <div>
        <div class="navbar">
            <van-icon name="arrow-left" class="back" @click="$router.go(-1)" />
            <div class="navbar-title">确认订单</div>
            <van-icon class="icon" size="20rem" name="wap-nav" @click="isShow = !isShow" />
            <div class="showMore" v-show="isShow">
                <router-link to="/" class="showMore-item">首页</router-link>
                <router-link to="/board" class="showMore-item">榜单</router-link>
                <router-link to="/hot" class="showMore-item">热点</router-link>
                <router-link to="/shopping" class="showMore-item">商城</router-link>
            </div>
        </div>
        <div class="content">
            <div class="deal">
                <div class="deal-left">
                    <img :src="food.imageUrl" alt="">
                </div>
                <div class="deal-right">
                    <h1>
                        <span class="title-tag">{{ food.titleTag }}</span>
                        {{ food.title }}
                    </h1>
                    <p>有效期: {{ formatDate(food.useBeginTime) }}-{{ formatDate(food.useEndTime) }}</p>
                    <p>可用时间:00:00-24:00 </p>
                    <div class="price">
                        {{ food.price }}元
                    </div>
                </div>
            </div>
            <div class="tag">
                <div class="renz">
                    <img src="../../assets/image/renz.png" alt="">
                </div>
                <div>过期自动退</div>
            </div>
        </div>
        <div class="grap"></div>
        <div class="list-item">
            <div class="list-title">
                套餐详情
            </div>
            <div class="item">
                <div class="item-name">爆米花</div>
                <div class="item-num">1桶</div>
            </div>
            <div class="item">
                <div class="item-name">可乐</div>
                <div class="item-num">2杯</div>
            </div>
            <div class="item">
                <div class="item-name">小麻花</div>
                <div class="item-num">1袋</div>
            </div>
        </div>
        <div class="grap"></div>
        <div class="number">
            <div class="number-title">
                数量
            </div>
            <div>
                <van-stepper v-model="value" />
            </div>
        </div>
        <div class="grap"></div>
        <div class="info">
            <div class="info-title">
                提示信息
            </div>
            <div class="info-content">
                <div>使用时间：请在影城卖品部营业时间兑换。</div>
                <div>有效期：2023.03.14 至 2023.05.08</div>
            </div>
        </div>
        <div class="pay">
            <div class="pay-price">
                <span>￥</span>
                {{ (food.price * value).toFixed(2) }}
            </div>
            <div class="pay-btn" @click="pay()">
                确认支付
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
            food: JSON.parse(this.$route.query.content),
            value: 1,
        }
    },
    mounted() {
        console.log(this.food);
        this.hide();
    },
    methods: {
        showMore() {
            if (this.isShow) {
                this.isShow = !this.isShow
            } else {
                this.isShow = !this.isShow
            }
        },
        pay() {
            this.$router.push({
                path: '/pay',
                query: {
                    price:JSON.stringify((this.food.price * this.value).toFixed(2))
                }
            })
        },
        ...mapMutations(["hide"]),
        formatDate(value) {
            var date = new Date(value);
            var y = date.getFullYear(),
                m = date.getMonth() + 1,
                d = date.getDate()
            if (m < 10) { m = '0' + m; }
            if (d < 10) { d = '0' + d; }
            var t = y + '.' + m + '.' + d;
            return t;
        }
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
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
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

.content {
    width: 100%;
    height: 160rem;
    padding: 14rem 10rem;

    .deal {
        height: 104rem;
        display: flex;

        .deal-left {
            width: 86rem;
            height: 100rem;
            padding-left: 3rem;
            margin-right: 10rem;

            img {
                width: 100%;
            }
        }

        .deal-right {
            flex: 1;

            h1 {
                font-size: 15rem;
                color: var(--nav-active-black);
                margin-bottom: 8rem;

                span {
                    width: 34rem;
                    height: 18rem;
                    padding: 3rem 5rem 0 5rem;
                    margin-right: 5rem;
                    font-size: 12rem;
                    color: var(--bg-white);
                    background-color: #f90;
                    border-radius: 3rem;
                }
            }

            p {
                color: var(--movie-score-after);
                height: 20rem;
                font-size: 14rem;
                line-height: 20rem;
            }

            .price {
                color: var(--tab-active);
                font-size: 17rem;
                margin-top: 5rem;
            }
        }
    }

    .tag {
        height: 26rem;
        padding-top: 9rem;
        border-top: 1rem solid var(--border-bottom);
        display: flex;
        line-height: 17rem;
        color: #6bbd00;
        font-size: 14rem;

        .renz {
            width: 15rem;
            height: 15rem;
            margin-right: 5rem;

            img {
                width: 100%;
                height: 100%;
            }
        }
    }
}

.grap {
    width: 100%;
    height: 10rem;
    background-color: var(--border-bottom);
}

.list-item {
    width: 100%;
    // height: 110rem;
    padding: 14rem 10rem;

    .list-title {
        height: 16rem;
        font-weight: bold;
        margin-bottom: 10rem;
        font-size: 14rem;
        color: var(--nav-active-black);
    }

    .item {
        height: 30rem;
        padding: 6rem 0;
        color: var(--movie-score-after);
        display: flex;
        justify-content: space-between;
    }
}

.number {
    height: 63rem;
    line-height: 35rem;
    padding: 14rem 10rem;
    display: flex;
    justify-content: space-between;

    .number-title {
        font-weight: bold;
        font-size: 14rem;
    }
}

.info {
    height: 119rem;
    padding-left: 10rem;

    .info-title {
        height: 49rem;
        font-weight: bold;
        font-size: 14rem;
        padding: 14rem 0;
        border-bottom: 1rem solid var(--border-bottom);
    }

    .info-content {
        height: 70rem;
        padding: 14rem 10rem 14rem 0;
        color: var(--movie-score-after);
        font-size: 13rem;

        div {
            height: 21rem;
            line-height: 21rem;
        }
    }
}

.pay {
    width: 100%;
    height: 65rem;
    position: absolute;
    bottom: 0;
    border-top: 1rem solid var(--border-bottom);
    display: flex;
    align-items: center;
    padding: 10rem;
    justify-content: space-between;

    .pay-price {
        font-size: 21rem;
        color: var(--tab-active);

        span {
            font-size: 14rem;
        }
    }

    .pay-btn {
        width: 160rem;
        height: 45rem;
        line-height: 45rem;
        font-size: 18rem;
        text-align: center;
        color: var(--bg-white);
        background-color: #f90;
        border-radius: 30rem;
        padding: 0 16rem;
    }
}
</style>