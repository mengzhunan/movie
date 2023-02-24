<template>
  <div class="home">
    <section class="head">
      <div class="nav-wrap">
        <div class="navbar">
          <div class="navbar-title">猫眼电影</div>
          <van-icon class="icon" size="20" name="wap-nav" />
        </div>

        <div class="topbar">
          <div class="location">广州<i><van-icon name="play" /></i></div>
          <div class="top-nav">
            <router-link class="link-item" to="/">热映</router-link>
            <router-link class="link-item" to="cinema">影院</router-link>
            <router-link class="link-item" to="/stay">待映</router-link>
            <router-link class="link-item" to="/classic">经典电影</router-link>
          </div>
          <van-icon class="icon" name="search" size="20" />
        </div>
      </div>
    </section>

    <router-view />
  </div>
</template>

<script>
import { advertisingAPI, contentListAPI } from '@/apis/index'

export default {
  data() {
    return {
      content: null,
    }
  },
  mounted() {

    advertisingAPI().then(data => {
      console.log(1, data);
    })

    contentListAPI().then(data => {
      console.log(2, data);
    })

  }
}
</script>

<style lang="scss" scoped>
.head {
  height: 94rem;
}

.nav-wrap {
  width: 100%;
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
  color: #fff;
  background-color: var(--theme-color);

  .navbar-title {
    flex: 1;
    text-align: center;
    font-size: 18rem;
  }
}

.topbar {
  display: flex;
  align-items: center;
  background-color: #fff;
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