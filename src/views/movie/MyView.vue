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
                <input type="text">
            </div>
            <div class="password">
                <input type="text">
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
    height: 602rem;

    input {
        outline: none;
    }
}
</style>