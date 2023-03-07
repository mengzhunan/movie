<template>
    <div>
        <div class="navbar">
            <a href="/">
                <van-icon name="arrow-left" class="back" />
            </a>
            <div class="navbar-title">猫眼电影</div>
            <div></div>
        </div>
        <div class="login">
            <div class="phone">
                <input type="text" placeholder="请输入手机号">
                <div class="captcha">
                    获取验证码
                </div>
            </div>
            <div class="password">
                <input type="text" placeholder="请输入短信验证码">
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

    a {
        text-decoration: none;
        outline: none;
        color: var(--bg-white);
    }

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
}

.login {
    width: 100%;

    .phone {
        position: relative;

        input {
            width: 331rem;
            height: 40rem;
            margin: 0 20rem 0 20rem;
            border: none;
            border-bottom: 1rem solid rgb(245, 245, 245);
        }

        .captcha {
            position: absolute;
            right: 25rem;
            bottom: 15rem;
        }
    }

    .password {
        input {
            width: 331rem;
            height: 40rem;
            margin: 0 20rem 0 20rem;
            border: none;
            border-bottom: 1rem solid rgb(245, 245, 245);
        }
    }

}
</style>