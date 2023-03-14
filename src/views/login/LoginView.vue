<template>
    <div>
        <div class="top">
            <van-icon name="arrow-left" size="24rem" class="back" @click="$router.go(-1)" />
            <div class="navbar-title">登录猫眼</div>
        </div>
        <div class="login">
            <div class="logo"></div>
            <van-form validate-first input-align="center" @submit="onLogin">
                <!-- 通过 pattern 进行正则校验 -->
                <div class="bor">
                    <van-field v-model="mobile" name="pattern" placeholder="请输入手机号"
                        :rules="[{ pattern, message: '请输入正确的手机号' }]" />
                </div>

                <div class="bor">
                    <van-field v-model="password" type="password" name="pwd"
                        :rules="[{ validator, message: '请输入不含中文和空格的6~16位密码' }]" placeholder="请输入密码" />
                </div>

                <van-button round block color="var(--theme-color)" type="info" native-type="submit">登录</van-button>

            </van-form>
        </div>

    </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
    data() {
        return {
            mobile: '',
            password: '',
            btnState: true,
            pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
        };
    },

    created() {
        this.hide();
    },

    methods: {
        ...mapMutations(['hide']),

        onLogin(value) {
            this.$toast({ message: '登录成功' });
            const TOKEN = Date.now()
            window.localStorage.setItem('token', JSON.stringify(TOKEN))
            window.localStorage.setItem('loginInformation', JSON.stringify(value))
            this.$router.replace({ path: this.$route.query.s })
        },

        validator(val) {
            return /^[^\u4e00-\u9fa5 ]{6,16}$/.test(val);
        },
    },
}
</script>

<style lang="scss" scoped>
.top {
    display: flex;
    align-items: center;
    height: 50rem;
    padding: 6rem;
    box-sizing: border-box;
    color: #000;
    background-color: #fff;
    border-bottom: 1px solid #dfdfdf;

    .navbar-title {
        flex: 1;
        text-align: center;
        font-size: 18rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}

.login {
    padding: 210rem 56rem 0;
    position: relative;

    .logo {
        position: absolute;
        top: 86rem;
        left: 50%;
        transform: translateX(-50%);
        width: 90rem;
        height: 102rem;
        background: url(../../assets/image/logo-2.png) no-repeat;
        background-size: 100% 100%;
    }

    .bor {
        width: 260rem;
        margin-bottom: 12rem;
        overflow: hidden;
        border: 1px solid #e2e2e2;
        border-radius: 30rem;
    }
}
</style>