import Axios from "axios";

const baseURL = `https://apis.netstart.cn/maoyan/`

const $http = Axios.create({
    baseURL
})

// axios 请求成功的数据一定放在 response.data 中，直接在拦截器中解析出来，避免以后再逐个结构
$http.interceptors.response.use(response => response.data)

export const contentListAPI = () => $http.get(`index/topRatedMovies`)

export const movieListAPI = () => $http.get(`index/movieOnInfoList`);

export const moreMovieListAPI = (id) => $http.get(`index/moreComingList?movieIds=${id}`);