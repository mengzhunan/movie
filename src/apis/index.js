import Axios from "axios";

const baseURL = `https://apis.netstart.cn/maoyan/`

const $http = Axios.create({
    baseURL
})

// axios 请求成功的数据一定放在 response.data 中，直接在拦截器中解析出来，避免以后再逐个结构
$http.interceptors.response.use(response => response.data)
// 好评电影列表
export const contentListAPI = () => $http.get(`index/topRatedMovies`);
// 电影列表
export const movieListAPI = () => $http.get(`index/movieOnInfoList`);
// 更多电影列表
export const moreMovieListAPI = (id) => $http.get(`index/moreComingList?movieIds=${id}`);
// 电影详情
export const movieDetailAPI = (id) => $http.get(`movie/detail?movieId=${id}`);
//经典电影
export const classicMovieAPI = () => $http.get('index/moreClassicList');
//更多经典电影
export const moreClassisMovieAPI = (limit) => $http.get(`index/moreClassicList?limit=${limit}`);
//待映电影
export const stayMovieAPI = () => $http.get('index/mostExpected')