<template>
    <div>

        <van-sticky>
            <van-tabs line-width="95rem" line-height="1px" title-active-color="var(--tab-active)">
                <!-- <van-tab :title="d" v-for="(d, i) in test" :key="i"></van-tab> -->

            </van-tabs>

            <van-dropdown-menu>
                <!-- 全城 -->
                <van-dropdown-item :title="title" ref="item">
                    <van-tabs line-width="180rem" line-height="1rem" color="var(--tab-active)"
                        title-active-color="var(--tab-active)" v-if="business.length">

                        <van-tab title="商区">
                            <van-tree-select height="100vw" :items="business" :main-active-index.sync="active">
                                <template #content>
                                    <div v-show="active === i" v-for="(t, i) in business" :key="i">
                                        <van-cell v-for="(v, h) in t.children" :key="h" :title="v.name"
                                            :class="businessClass == h ? 'actived' : ''" @click="placeBusiness(t, v, h)" />
                                    </div>
                                </template>
                            </van-tree-select>
                        </van-tab>

                        <van-tab title="地铁站">
                            <van-tree-select height="100vw" :items="subway" :main-active-index.sync="active">
                                <template #content>
                                    <div v-show="active === i" v-for="(t, i) in subway" :key="i">
                                        <van-cell v-for="(v, h) in t.children" :key="h" :title="v.name"
                                            :class="subwayClass == h ? 'actived' : ''" @click="placeSubway(t, v, h)" />
                                    </div>
                                </template>
                            </van-tree-select>
                        </van-tab>

                    </van-tabs>
                </van-dropdown-item>
                <!-- 品牌 -->
                <van-dropdown-item v-model="value" :options="option" @change="brand(option[value].id)" />
                <!-- 特色 -->
                <van-dropdown-item :title="feature" ref="demo">
                    <div class="service">
                        <div class="s-title">特色功能</div>
                        <div class="s-content">
                            <div class="s-block" v-for="(s, index) in cinemaService" :key="s.id"
                                :class="serviceClass == index ? 'actived' : ''" @click="characteristic(index, s)">{{
                                    s.name
                                }}
                            </div>
                        </div>
                    </div>
                    <div class="special">
                        <div class="special-title">特殊厅</div>
                        <div class="special-content">
                            <div class="special-block" v-for="(p, index) in special" :key="p.id"
                                :class="activeClass == index ? 'actived' : ''" @click="unique(index, p)">{{ p.name
                                }}
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
            <div v-if="cinemaContent.length">
                <CinemaCard :c="cinemaContent" />
            </div>
            <div v-else>
                <div class="cinema-no">
                    <img src="../../assets/image/Nothing.png" alt="">
                    <div class="txt">暂无相关影院信息</div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import { mapState } from 'vuex';
import { cinemaScreeningAPI, nearbyCinemaAPI } from '@/apis/index'
import CinemaCard from '@/components/detail/CinemaCard.vue'
import LoadingPage from '@/components/LoadingPage.vue';

export default {

    components: {
        CinemaCard,
        LoadingPage
    },

    data() {
        return {
            value: 0,
            active: 0,
            title: '全城',
            test: [],
            // 特色筛选信息
            feature: '筛选',
            charTitle: null,
            specialTitle: null,
            businessClass: 0,
            subwayClass: 0,
            activeClass: 0,
            serviceClass: 0,
            // 影院信息
            cinemaContent: [],
            // 加载状态
            loadingState: true,
            // 商区
            business: [],
            // 地铁
            subway: [],
            // 品牌
            option: [],
            // 筛选-特色功能
            cinemaService: [],
            // 筛选-特殊厅
            special: [],
            // 临时的
            temporaryHallType: -1,
            temporaryServiceId: -1,
            id: {
                // 商区id
                districtId: -1,
                // 地铁号线id
                lineId: -1,
                // 地铁站点id
                stationId: -1,
                // 影院id
                brandId: -1,
                // 特色功能id
                serviceId: -1,
                // 特殊厅id
                hallType: -1,
            }
        };
    },

    methods: {

        // onClick(index, title) {
        //     console.log(title);
        // },

        // 特色功能
        characteristic(i, e) {
            console.log('特色功能id', e.id);
            this.temporaryServiceId = e.id
            this.charTitle = e.name
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
                    this.feature = '筛选'
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
                    this.feature = '筛选'
                }
            }
            this.activeClass = i
        },

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

        // 商区筛选
        placeBusiness(res, event, k) {
            this.businessClass = k
            this.$refs.item.toggle();

            if (event.name == "全部") {
                console.log("商区id", res.id);
                this.id.districtId = res.id
                this.title = res.text.split('(')[0]
            } else {
                console.log("商区id", event.id);
                this.id.districtId = event.id
                this.title = event.name
            }
        },
        // 地铁筛选
        placeSubway(res, event, k) {
            this.subwayClass = k
            this.$refs.item.toggle();
            this.id.districtId = -1;
            this.id.lineId = res.id

            if (event.name == "全部") {
                console.log("地铁号线id", res.id);
                this.id.stationId = -1
                this.title = res.text.split('(')[0]
            } else {
                console.log("地铁站点id", event.id);
                this.id.stationId = event.id
                this.title = event.name
            }
        },

        // 品牌影院
        brand(e) {
            this.id.brandId = e;
            console.log("品牌影院id", e);
        },

        // 重置按钮
        reset() {
            this.feature = '筛选'
            this.charTitle = null
            this.specialTitle = null
            this.activeClass = 0
            this.serviceClass = 0
            this.temporaryHallType = -1
            this.temporaryServiceId = -1
        },

        // 确定按钮
        onConfirm() {
            this.$refs.demo.toggle();

            if (this.temporaryHallType == -1 && this.temporaryServiceId == -1) {
                return;
            }

            this.id.hallType = this.temporaryHallType
            this.id.serviceId = this.temporaryServiceId
        }
    },

    mounted() {

        // let newDate = new Date();
        // let year = newDate.getFullYear();
        // let month = newDate.getMonth() + 1;
        // let day = newDate.getDate()
        // console.log(year, month, day);

        // for (let i = 0; i < 7; i++) {
        //     let b = day + i
        //     let date = `${month}月${b}日`
        //     this.test.push(date)
        // }
        // console.log(this.test);


        cinemaScreeningAPI(this.cityLocation.id).then((data) => {
            this.business = this.content(data.district?.subItems)
            this.subway = this.content(data.subway?.subItems)
            this.cinemaService = data.service.subItems;
            this.special = data.hallType.subItems

            // 筛选品牌
            let cinema = data.brand.subItems;
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
        });

        nearbyCinemaAPI(this.cityLocation.id, this.cityLocation.lat, this.cityLocation.lng, this.id).then((data) => {
            this.cinemaContent = data;
            this.loadingState = false;
        })
    },

    computed: {
        ...mapState(['cityLocation'])
    },

    watch: {
        "id": {
            deep: true,
            handler() {
                this.loadingState = true;
                nearbyCinemaAPI(this.cityLocation.id, this.cityLocation.lat, this.cityLocation.lng, this.id).then((data) => {
                    console.log('条件筛选', data);
                    this.cinemaContent = data;
                    this.loadingState = false;
                })

            }
        },
    }
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
