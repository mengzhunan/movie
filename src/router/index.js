import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/movie/HomeView.vue'
import VideoView from '../views/video/VideoView.vue'
import ShortVideoView from '../views/shortVideo/ShortVideoView.vue'
import MovieView from '../views/movie/MovieView.vue'
import BoardView from '../views/movie/BoardView.vue'
import CityListView from '../views/movie/CityListView.vue'
import SearchView from '../views/movie/SearchView.vue'
Vue.use(VueRouter)

const routes = [{
  // 电影/影院
  path: '/',
  component: HomeView,
  children: [{
    // 热映
    path: '',
    name: 'movie',
    component: MovieView,
  },
  {
    // 影院
    path: 'cinema',
    name: 'cinema',
    component: () => import('../views/movie/CinemaView.vue')
  },
  {
    // 待映
    path: 'stay',
    name: 'stay',
    component: () => import('../views/movie/StayView.vue')
  },
  {
    // 经典
    path: 'classic',
    name: 'classic',
    component: () => import('../views/movie/ClassicView.vue')
  }
  ]
},

{
  // 视频
  path: '/video',
  name: 'video',
  component: VideoView
},
{
  // 小视频
  path: '/shortvideo',
  name: 'shortvideo',
  component: ShortVideoView
},
{
  // 榜单
  path: '/board',
  name: 'board',
  component: BoardView
},
{
  // 定位
  path: '/city-list',
  name: 'city-list',
  component: CityListView
},
{
  // 电影详情
  path: '/detail/:id',
  name: 'detail',
  props: true,
  component: () => import('../views/detail/MovieDetailView.vue')
},
{
  //搜索页面
  path: '/search',
  name: 'search',
  component: SearchView
}

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router