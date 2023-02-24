<template>
  <div id="app">
    <van-tabbar v-model="active" active-color="var(--tab-active)" inactive-color="var(--tab-inactive)">
      <van-tabbar-item to="/" icon="home-o">电影/影院</van-tabbar-item>
      <van-tabbar-item to="/video" icon="tv-o">视频</van-tabbar-item>
      <van-tabbar-item to="/shortvideo" icon="video-o">小视频</van-tabbar-item>
      <van-tabbar-item to="/" icon="manager-o">我的</van-tabbar-item>
    </van-tabbar>

    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0
    }
  }
}
</script>

<style lang="scss">

</style>
