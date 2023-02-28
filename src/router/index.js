import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/movie/HomeView.vue'
import VideoView from '../views/video/VideoView.vue'
import ShortVideoView from '../views/shortVideo/ShortVideoView.vue'
import MovieView from '../views/movie/MovieView.vue'
import BoardView from '../views/movie/BoardView.vue'
import CityListView from '../views/movie/CityListView.vue'
Vue.use(VueRouter)

const routes = [{
  path: '/',
  component: HomeView,
  children: [{
    path: '',
    name: 'movie',
    component: MovieView,
  },
  {
    path: 'cinema',
    name: 'cinema',
    component: () => import('../views/movie/CinemaView.vue')
  },
  {
    path: 'stay',
    name: 'stay',
    component: () => import('../views/movie/StayView.vue')
  },
  {
    path: 'classic',
    name: 'classic',
    component: () => import('../views/movie/ClassicView.vue')
  }
  ]
},

{
  path: '/video',
  name: 'video',
  component: VideoView
},
{
  path: '/shortvideo',
  name: 'shortvideo',
  component: ShortVideoView
},
{
  path: '/board',
  name: 'board',
  component: BoardView
},
{
  path: '/city-list',
  name: 'city-list',
  component: CityListView
}

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router