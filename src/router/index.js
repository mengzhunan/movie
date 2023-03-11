import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/movie/HomeView.vue'
import VideoView from '../views/video/VideoView.vue'
import ShortVideoView from '../views/shortVideo/ShortVideoView.vue'
import MovieView from '../views/movie/MovieView.vue'
import BoardView from '../views/movie/BoardView.vue'
import CityListView from '../views/movie/CityListView.vue'
import SearchView from '../views/movie/SearchView.vue'
import HotView from '../views/movie/HotView.vue'
import ShoppingView from '../views/movie/ShoppingView.vue'
import VideoPlayView from '../views/movie/VideoPlayView.vue'
import MyView from '../views/movie/MyView.vue'
import ShortVideoDetail from '../views/detail/ShortVideoDetailView.vue'
import DetailVideoView from '../views/detail/DetailVideoView.vue'
import CinemaDetail from '@/views/detail/CinemaDetail.vue'
import SearchMovieDetail from '../views/detail/SearchMovieDetail.vue'

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
  //视频详情
  path: '/video/:id',
  name: 'VideoPlayViewVue',
  props: true,
  component: VideoPlayView
},
{
  // 小视频
  path: '/shortvideo',
  name: 'shortvideo',
  component: ShortVideoView
},
{
  //小视频详情
  path: '/shortvideo/:id',
  name: 'shortVideoDetail',
  component: ShortVideoDetail
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
  path: '/detail/:id/',
  name: 'detail',
  props: true,
  component: () => import('../views/detail/MovieDetailView.vue'),
},
{
  //影院详情推荐视频
  path: '/detail/video/:id',
  name: 'detailVideo',
  component: DetailVideoView
},
{
  //搜索页面
  path: '/search',
  name: 'search',
  component: SearchView
},
{
  //搜索的全部电影
  path: '/search/allmovie/',
  name: 'allmovie',
  component: SearchMovieDetail,
},
{
  //购票页面
  path: '/buy/:id',
  name: 'buy',
  props: true,
  component: () => import('../views/detail/BuyTicketView.vue'),
},
{
  //热点页面
  path: '/hot',
  name: 'hot',
  component: HotView
},
{
  //商城页面
  path: '/shopping',
  name: 'shopping',
  component: ShoppingView
},
{
  //我的页面
  path: '/myview',
  name: 'myview',
  component: MyView
},
{
  //影院详情
  path: '/cinema/:id',
  name: 'cinemaDetail',
  props: true,
  component: CinemaDetail
}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach((to, from, next) => {
//   to, from
//   console.log('全局路由拦截');
//   next();
// })

export default router