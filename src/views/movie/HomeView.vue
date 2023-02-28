<template>
  <div class="home">
    <section class="head">
      <div class="nav-wrap">
        <div class="navbar">
          <div class="navbar-title">猫眼电影</div>
          <van-icon class="icon" size="20rem" name="wap-nav" @click="showMore()" />
          <div class="showMore" v-show="isShow">
            <a href="/" @click="hidden()" class="showMore-item">首页</a>
            <a href="/board" class="showMore-item">榜单</a>
            <a href="/" class="showMore-item">热点</a>
            <a href="/" class="showMore-item">商城</a>
          </div>
        </div>

        <div class="topbar">
          <a href="/city-list" class="location">广州<i><van-icon name="play" /></i></a>
          <div class="top-nav">
            <router-link class="link-item" to="/">热映</router-link>
            <router-link class="link-item" to="cinema">影院</router-link>
            <router-link class="link-item" to="/stay">待映</router-link>
            <router-link class="link-item" to="/classic">经典电影</router-link>
          </div>
          <van-icon class="icon" name="search" size="20rem" />
        </div>
      </div>
    </section>

    <router-view />
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  data() {
    return {
      isShow: false
    }
  },
  computed: {
    ...mapState(['navBarState'])
  },
  mounted() {
    this.show();
  },
  methods: {
    ...mapMutations(['hide', 'show']),
    showMore() {
      if (this.isShow) {
        this.isShow = !this.isShow
      } else {
        this.isShow = !this.isShow
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.head {
  height: 94rem;
}

.nav-wrap {
  width: 100%;
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
}

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

.topbar {
  display: flex;
  align-items: center;
  background-color: var(--bg-white);
  border-bottom: 1rem solid #e6e6e6;
  box-sizing: border-box;
  height: 44rem;

  .location {
    padding: 0 0 0 10rem;
    font-size: 14rem;
    color: var(--nav-black);

    i {
      margin-left: 2rem;
      transform: rotate(90deg);
    }
  }

  .top-nav {
    flex: 1;
    display: flex;
    justify-content: space-around;
  }

  .link-item {
    position: relative;
    font-size: 15rem;
    font-weight: 700;
    color: var(--nav-black);

    &.router-link-exact-active {
      font-size: 18rem;
      color: var(--nav-active-black);

      &::after {
        position: absolute;
        left: 20%;
        bottom: -10rem;
        width: 60%;
        height: 3rem;
        border-radius: 10rem;
        content: '';
        background-color: var(--theme-color);
      }
    }
  }

  .icon {
    padding: 0 15rem 0 0;
    font-weight: 700;
    color: var(--theme-color);
  }

}
</style>