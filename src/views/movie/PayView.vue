<template>
    <div>
        <div class="navbar">
            <div class="icon">
                <van-icon name="arrow-left" @click="$router.go(-1)" />
            </div>
            <div class="title">
                支付订单
            </div>
        </div>
        <div class="content">
            <div class="price">
                <span>￥</span>
                {{ price }}
            </div>
            <div class="pay-title">猫眼商品-订单编号:23665392439</div>
        </div>
        <div class="pay-type">
            <div class="wx-img">
                <img src="https://p1.meituan.net/pay/161b1d5a3a5ecacca44db5ca259f608c1944.png" alt="">
            </div>
            <div class="pay-text">
                微信支付
            </div>
            <div>
                <van-radio-group v-model="radio">
                    <van-radio name="1"></van-radio>
                </van-radio-group>
            </div>
        </div>
        <div class="pay-type">
            <div class="wx-img">
                <img src="https://p0.meituan.net/pay/ca419ff74e218f206604c50975c234111620.png" alt="">
            </div>
            <div class="pay-text">
                支付宝支付
            </div>
            <div>
                <van-radio-group v-model="radio">
                    <van-radio name="2"></van-radio>
                </van-radio-group>
            </div>
        </div>
        <div class="pay-btn">
            <div class="btn" @click="password()">
                确认支付
            </div>
        </div>
        <van-password-input :value="value" :focused="showKeyboard" @focus="showKeyboard = true" v-show="isShow" />
        <!-- 数字键盘 -->
        <van-number-keyboard v-model="value" :show="showKeyboard" @blur="showKeyboard = false" />
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { Dialog } from 'vant';
export default {
    data() {
        return {
            price: JSON.parse(this.$route.query.price),
            radio: '1',
            value: '',
            showKeyboard: false,
            isShow: false
        }
    },
    mounted() {
        this.hide();
    },
    methods: {
        ...mapMutations(["hide"]),
        password() {
            this.isShow = true
            this.showKeyboard = true
        },
        tip() {
            Dialog.alert({
                message: '支付成功',
            }).then(() => {
                this.$router.go(-1)
            });
        }
    },
    watch: {
        value(value) {
            if (value.length == 6) {
                this.showKeyboard = false
                this.isShow = false
                this.tip()
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.navbar {
    width: 100%;
    height: 42rem;
    background-color: #FAFAFA;
    border-bottom: 1rem solid var(--border-bottom);
    position: relative;

    .icon {
        width: 50rem;
        height: 42rem;
        line-height: 42rem;
        padding: 0 18rem;
        text-align: center;
        font-size: 18rem;
    }

    .title {
        position: absolute;
        left: 40%;
        top: 50%;
        font-size: 17rem;
        transform: translateY(-50%);
    }
}

.content {
    width: 100%;
    height: 158rem;
    padding: 41rem 0 16rem 0;

    .price {
        width: 100%;
        height: 40rem;
        font-size: 40rem;
        text-align: center;
        margin-top: 12rem;

        span {
            font-size: 24rem;
            margin-right: -10rem;
        }
    }

    .pay-title {
        height: 18rem;
        line-height: 18rem;
        color: var(--movie-score-after);
        text-align: center;

    }
}

.pay-type {
    display: flex;
    width: 100%;
    height: 66rem;
    padding: 0 20rem;
    align-items: center;

    .wx-img {
        width: 30rem;
        height: 20rem;

        img {
            width: 22rem;
            height: 22rem;
        }
    }

    .pay-text {
        font-size: 16rem;
        width: 279rem;
        height: 42rem;
        line-height: 24rem;
        padding: 9rem;
    }
}

.pay-btn {
    width: 100%;
    height: 76rem;
    padding: 15rem 20rem;
    position: absolute;
    bottom: 0;

    .btn {
        height: 100%;
        text-align: center;
        line-height: 46rem;
        color: var(--bg-white);
        background-color: var(--theme-color);
        border-radius: 8rem;
        font-size: 16rem;
    }
}
</style>