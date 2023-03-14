<template>
    <div>
        <div class="navbar">
            <div class="navbar-title">我的</div>
        </div>
        <div class="hear">
            <div class="picture">
                <img src="../../assets/image/picture.png" alt="">
            </div>
            <div class="name">{{ name }}</div>
        </div>
        <div class="content">
            <div class="order">
                <div class="title">我的订单</div>
            </div>
        </div>
        <van-cell title="优惠卷" is-link />
        <van-cell title="折扣卡" is-link />

        <div class="btn">
            <van-button round color="var(--theme-color)" type="primary" block @click="secede">退出登录</van-button>
        </div>

    </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
    data() {
        return {
            name: '',
        }
    },

    mounted() {
        this.show()
        let item = JSON.parse(window.localStorage.getItem('loginInformation'));
        this.name = item.pattern
    },

    methods: {
        ...mapMutations(['show']),

        secede() {
            window.localStorage.removeItem('token');
            this.$router.replace('/');
            // console.log(window.location.pathname);
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

    .navbar-title {
        flex: 1;
        text-align: center;
        font-size: 18rem;
    }
}

.hear {
    background-color: var(--theme-color);
    display: flex;
    align-items: center;
    padding: 30rem 0;

    .picture {
        img {
            display: inline-block;
            margin: 0 10rem;
            width: 60px;
            height: 60px px;
            border-radius: 60px;
            border: 3px solid #fff;
        }
    }

    .name {
        font-size: 18rem;
        color: #fff;
    }
}

.content {
    padding: 15rem 10rem;

    .order {
        height: 150rem;
        border-radius: 10rem;
        background-color: var(--bg-city);
    }

    .title {
        padding: 10rem;
        font-size: 16rem;
    }
}

.btn {
    box-sizing: border-box;
    margin: 50rem 0;
    padding: 0 15rem;
}
</style>