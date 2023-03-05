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
// 电影购票详情
export const movieTicketDetails = (id) => $http.get(`movie/intro?movieId=${id}`)
// 经典电影
export const classicMovieAPI = () => $http.get('index/moreClassicList');
// 更多经典电影
export const moreClassisMovieAPI = (limit) => $http.get(`index/moreClassicList?limit=${limit}`);
// 最受期待电影
export const mostExpectedMovieAPI = () => $http.get('index/mostExpected')
// 待映列表
export const stayMovieListAPI = () => $http.get('index/comingList')
// 更多待映列表
export const moreStayMovieAPI = (id) => $http.get(`index/moreComingList?ci=1&limit=10&movieIds=${id}`)

// 城市列表
export const cityListAPI = () => $http.get('cities.json')
// 获取当前位置
export const positioningAPI = () => Axios.get(`https://api.asilu.com/geo`)
// 通过城市名称获取到对应的经纬度
export const cityBasePointAPI = (city) => Axios.get(`http://api.map.baidu.com/geocoding/v3/?address=${city}&output=json&ak=7khcth5v6N9ddhW0spLMGg8ZuF5HAbzq`)
// 根据经纬度获取城市id
export const cityLocationAPI = (lat, lng) => $http.get(`city/latlng?lat=${lat}&lng=${lng}`)
// 获取影院筛选条件
export const cinemaScreeningAPI = (id) => $http.get(`index/filterCinemas?ci=${id}`)
//视频接口
export const videoAPI = (id) => $http.get(`video/${id}`)

