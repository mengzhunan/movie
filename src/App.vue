<template>
  <div id="app">
    <van-tabbar route v-show="navBarState" active-color="var(--tab-active)" inactive-color="var(--tab-inactive)">
      <van-tabbar-item to="/" icon="home-o">电影/影院</van-tabbar-item>
      <van-tabbar-item to="/video" icon="tv-o">视频</van-tabbar-item>
      <van-tabbar-item to="/shortvideo" icon="video-o">小视频</van-tabbar-item>
      <van-tabbar-item to="/myview" icon="manager-o">我的</van-tabbar-item>
    </van-tabbar>

    <router-view />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  data() {
    return {
      path: window.location.pathname,
    }
  },

  computed: {
    // ...mapState(['navBarState','list'])
    ...mapState(['navBarState'])

  },
  mounted() {
    this.getPosition();
  },
  // watch:{
  //   list:{
  //     handler(newValue){
  //       window.localStorage.setItem('list',JSON.stringify(newValue))
  //     }
  //   }
  // },
  methods: {
    ...mapActions(['getPosition']),
  },

}
</script>

<style lang="scss"></style>
