<template>
    <div>

        <van-sticky>
            <van-tabs title-active-color="var(--tab-active)" @click="time" line-width="82rem" line-height="1rem">
                <van-tab :title="d.date" v-for="d in date" :key="d.id"></van-tab>
            </van-tabs>

            <van-dropdown-menu>
                <!-- 全城 -->
                <van-dropdown-item :title="title" ref="item">
                    <van-tabs line-width="180rem" line-height="1px" color="var(--tab-active)"
                        title-active-color="var(--tab-active)">

                        <van-tab title="商区">
                            <van-tree-select :items="business" :main-active-index.sync="businessActive"
                                @click-nav="nav(business[businessActive])">
                                <template #content>
                                    <div v-show="businessActive === i" v-for="(t, i) in business" :key="i">
                                        <van-cell v-for="(v, h) in t.children" :key="h" :title="v.name"
                                            :class="businessClass == h ? 'actived' : ''"
                                            @click.prevent="placeBusiness(t, v, h)" />
                                    </div>
                                </template>
                            </van-tree-select>
                        </van-tab>

                        <van-tab title="地铁站">
                            <van-tree-select :items="subway" :main-active-index.sync="subwayActive"
                                @click-nav="nav(subway[subwayActive])">
                                <template #content>
                                    <div v-show="subwayActive === i" v-for="(t, i) in subway" :key="i">
                                        <van-cell v-for="(v, h) in t.children" :key="h" :title="v.name"
                                            :class="subwayClass == h ? 'actived' : ''" @click.stop="placeSubway(t, v, h)" />
                                    </div>
                                </template>
                            </van-tree-select>
                        </van-tab>

                    </van-tabs>
                </van-dropdown-item>
                <!-- 品牌 -->
                <van-dropdown-item v-model="value" :title="brandTitle" :options="option" @change="brand(option[value])" />
                <!-- 特色 -->
                <van-dropdown-item :title="feature" ref="demo">

                    <div class="service" v-if="cinemaService">
                        <div class="s-title">特色功能</div>
                        <div class="s-content">
                            <div class="s-block" v-for="(s, index) in cinemaService" :key="s.id"
                                :class="serviceClass == index ? 'actived' : ''" @click="characteristic(index, s)">{{ s.name
                                }}
                            </div>
                        </div>
                    </div>

                    <div class="special" v-if="special">
                        <div class="special-title">特殊厅</div>
                        <div class="special-content">
                            <div class="special-block" v-for="(p, index) in special" :key="p.id"
                                :class="activeClass == index ? 'actived' : ''" @click="unique(index, p)">{{ p.name }}
                            </div>
                        </div>
                    </div>

                    <div class="btn">
                        <van-button class="button" @click="reset">重置</van-button>
                        <van-button class="button" type="danger" @click="onConfirm">确认</van-button>
                    </div>
                </van-dropdown-item>

            </van-dropdown-menu>
        </van-sticky>

        <LoadingPage v-if="loadingState" />

        <div class="cinema-content" v-else>

            <div>
                <CinemaScreening v-for="c in CinemaScreeningResults" :key="c.id" :cinemas="c" />
            </div>

            <!-- <div v-else>
                <div class="cinema-no">
                    <img src="../../assets/image/Nothing.png" alt="">
                    <div class="txt">暂无相关影院信息</div>
                </div>
            </div> -->
        </div>

    </div>
</template>

<script>
import { mapState } from 'vuex';
import { filmReleaseAPI, cinemaResultsListAPI, releaseDate } from '@/apis/index'
import LoadingPage from '@/components/LoadingPage.vue';
import CinemaScreening from '@/components/detail/CinemaScreening.vue'

export default {
    props: ['movieId'],

    components: {
        LoadingPage,
        CinemaScreening
    },

    data() {
        return {
            value: 0,
            // 影院刷选结果
            CinemaScreeningResults: [],
            // 商圈侧边下标
            businessActive: 0,
            // 地铁侧边下标
            subwayActive: 0,
            serviceClass: 0,
            activeClass: 0,
            // 商圈地点高亮标识
            businessClass: 0,
            // 地铁站点高亮标识
            subwayClass: 0,
            date: [],
            // 数据请求状态
            loadingState: false,
            // 影院筛选的条件
            parameter: {
                movieId: this.movieId,
                cityId: null,
                // showDate: '2021-11-13'
                showDate: this.$route.query.m.rt,
            },
            // 筛选参数
            condition: {
                showDate: "2021-11-13",
                movieId: this.movieId,
                cityId: null,
                lat: null,
                lng: null,
                districtId: -1,
                // 地铁号线id
                lineId: -1,
                areaId: -1,
                // 地铁站点id
                stationId: -1,
                // 影院id
                brandIds: -1,
                // 特色功能id
                serviceIds: -1,
            },
            // 商区数组
            business: [],
            // 地铁数组
            subway: [],
            // 筛选-特色功能
            cinemaService: [],
            // 筛选-特殊厅
            special: [],
            title: '全城',
            brandTitle: '品牌',
            // 特色筛选信息
            feature: '筛选',
            // 品牌影院数据
            option: [],
            // 临时的特色功能id
            temporaryServiceId: -1,
        };
    },


    methods: {
        // 获取上映时间
        time(name) {
            console.log(this.date[name].id);
            if (this.condition.showDate == this.date[name].id) {
                return
            } else {
                this.condition.showDate = this.date[name].id
            }
        },
        // 筛选方法
        content(data) {
            let action = []
            data.forEach(h => {
                let set = {
                    id: h.id,
                    text: `${h.name}(${h.count})`,
                    children: h.subItems,
                }
                action.push(set)
            })
            return action
        },
        // 侧边导航
        nav(e) {
            let name = e.text.split('(')[0]
            if (name == "全部") {
                this.title = '全城'
                this.$refs.item.toggle();

                if (this.condition.districtId == e.id) {
                    return
                } else {
                    this.condition.districtId = e.id
                }
                console.log(e.id);
            }
        },
        // 商区筛选
        placeBusiness(res, event, k) {
            this.businessClass = k
            this.$refs.item.toggle();

            if (event.name == "全部") {
                console.log("区id", res.id);
                this.title = res.text.split('(')[0]
                this.condition.districtId = res.id

            } else {
                console.log("地点id", event.id);
                this.title = event.name
                this.condition.districtId = event.id
            }
        },
        // 地铁筛选
        placeSubway(res, event, k) {
            this.subwayClass = k
            this.$refs.item.toggle();
            // 商区变为-1
            this.condition.districtId = -1;
            // 号线id
            this.condition.lineId = res.id;
            // 站点id
            this.condition.stationId = event.id

            if (event.name == "全部") {
                console.log("地铁号线id", event.id);
                this.title = res.text.split('(')[0]
            } else {
                console.log("地铁站点id", event.id);
                this.title = event.name
            }
        },
        // 品牌影院
        brand(e) {
            console.log("品牌影院id", e.id);
            this.condition.brandIds = e.id;
            if (e.text == '全部') {
                this.brandTitle = '品牌'
            } else {
                this.brandTitle = e.text
            }
        },
        // 特色功能
        characteristic(i, e) {
            console.log('特色功能id', e.id);
            this.temporaryServiceId = e.id;
            // this.charTitle = e.name
            if (!this.specialTitle) {
                this.feature = e.name
            } else {
                this.feature = `${e.name},${this.specialTitle} `
            }

            if (e.name == "全部") {
                this.charTitle = null

                if (this.specialTitle) {
                    this.feature = this.specialTitle
                } else {
                    this.feature = '特色'
                }
            }
            this.serviceClass = i
        },
        // 特殊厅
        unique(i, e) {
            console.log('特殊厅id', e.id);
            this.temporaryHallType = e.id
            this.specialTitle = e.name

            if (!this.charTitle) {
                this.feature = e.name
            } else {
                this.feature = `${this.charTitle},${e.name} `
            }

            if (e.name == "全部") {
                this.specialTitle = null

                if (this.charTitle) {
                    this.feature = this.charTitle
                } else {
                    this.feature = '特色'
                }
            }
            this.activeClass = i
        },

        // 重置按钮
        reset() {
            this.serviceClass = 0;
            this.temporaryServiceId = -1;
        },

        // 确定按钮
        onConfirm() {
            this.$refs.demo.toggle();
            this.condition.serviceIds = this.temporaryServiceId;
        }
    },

    mounted() {
        // 上映日期
        releaseDate(this.movieId, this.cityLocation.id).then((date) => {
            let { dates } = date.data

            let demo = []
            dates.forEach(d => {
                let time = d.date.split('-');
                let item = `${time[1]}月${time[2]}日`
                let dateObj = {
                    id: d.date,
                    date: item
                }
                demo.push(dateObj);
            })
            this.date = demo;
        })

        // 筛选条件
        this.parameter.cityId = this.cityLocation.id;
        filmReleaseAPI(this.parameter).then((res) => {
            this.business = this.content(res.data.district?.subItems);
            this.subway = this.content(res.data.subway?.subItems);
            this.cinemaService = res.data.service?.subItems;
            this.special = res.data.hallType?.subItems

            // 筛选品牌
            let cinema = res.data.brand?.subItems;
            let action = []
            cinema.forEach((h, i) => {
                let set = {
                    id: h.id,
                    text: h.name,
                    count: h.count,
                    value: i
                }
                action.push(set)
            })
            this.option = action;
        })

        // 筛选结果
        this.condition.cityId = this.cityLocation.id;
        this.condition.lat = this.cityLocation.lat;
        this.condition.lng = this.cityLocation.lng
        // console.log('参数', this.condition);
        cinemaResultsListAPI(this.condition).then((results) => {

            console.log('结果',results);
            this.CinemaScreeningResults = results.data.cinemas
        })
    },

    watch: {
        "condition": {
            deep: true,
            handler() {
                cinemaResultsListAPI(this.condition).then((results) => {
                    this.CinemaScreeningResults = results.data.cinemas
                })
            }
        }
    },

    computed: {
        ...mapState(['cityLocation'])
    },

}
</script>

<style lang="scss" scoped>
.actived {
    color: #f03d37;
}

.s-title,
.special-title {
    line-height: 22rem;
    margin: 10rem 0 0 12rem;
    color: #777;
    font-size: 15rem;
}


.s-content,
.special-content {
    margin: 0 12rem 12rem;
    display: flex;
    flex-wrap: wrap;

    .s-block,
    .special-block {
        width: 74rem;
        height: 30rem;
        margin: 10rem 10rem 0 0;
        color: var(--nav-black);
        border: 1rem solid #ccc;
        border-radius: 4rem;
        line-height: 30rem;
        text-align: center;

        &.actived {
            background: #fcf0f0;
            color: #f03d37;
            border: 1rem solid var(--tab-active);
        }
    }
}

.special-block {
    flex-shrink: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 0 4rem;
}


.btn {
    margin: 0 12rem;
    display: flex;
    justify-content: space-between;

    .button {
        width: 80rem;
        height: 35rem;
        border-radius: 4rem;
        margin: 12rem 0;
    }
}

.cinema-no {
    margin: 0 94rem;
    padding-top: 75rem;

    img {
        margin: 0 56rem;
        width: 75rem;
        height: 85rem;
    }

    .txt {
        font-size: 14rem;
        color: #777;
        text-align: center;
        line-height: 22rem;
    }
}
</style>
