<template>
    <div>

        <van-sticky>
            <van-tabs title-active-color="var(--tab-active)">
                <van-tab :title="d" v-for="(d, i) in test" :key="i"></van-tab>
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
import { filmReleaseAPI } from '@/apis/index'
import LoadingPage from '@/components/LoadingPage.vue';

export default {
    props: ['movieId'],

    components: {
        LoadingPage
    },

    data() {
        return {
            value: 0,
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
            test: [],
            // 数据请求状态
            loadingState: false,
            // 影院刷选的条件
            parameter: {
                movieId: this.movieId,
                cityId: null,
                // showDate: '2021-11-13'
                showDate: this.$route.query.m.rt,
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
        };
    },


    methods: {
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
                console.log(e.id);
            }
        },
        // 商区筛选
        placeBusiness(res, event, k) {
            this.businessClass = k
            this.$refs.item.toggle();

            if (event.name == "全部") {
                console.log("商区id", res.id);
                this.title = res.text.split('(')[0]
            } else {
                console.log("商区id", event.id);
                this.title = event.name
            }
        },
        // 地铁筛选
        placeSubway(res, event, k) {
            this.subwayClass = k
            this.$refs.item.toggle();

            if (event.name == "全部") {
                console.log("地铁号线id", res.id);
                this.title = res.text.split('(')[0]
            } else {
                console.log("地铁站点id", event.id);
                this.title = event.name
            }
        },
        // 品牌影院
        brand(e) {
            console.log("品牌影院id", e.id);
            if (e.text == '全部') {
                this.brandTitle = '品牌'
            } else {
                this.brandTitle = e.text
            }
        },
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
        reset() { },

        // 确定按钮
        onConfirm() {
            this.$refs.demo.toggle();
        }
    },

    mounted() {

        this.parameter.cityId = this.cityLocation.id;
        // this.parameter.showDate = this.$route.query.m.rt;

        console.log(this.parameter);

        filmReleaseAPI(this.parameter).then((res) => {
            this.business = this.content(res.data.district.subItems);
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


        let newDate = new Date();
        let year = newDate.getFullYear();
        let month = newDate.getMonth() + 1;
        let day = newDate.getDate()
        console.log(year, month, day);

        for (let i = 0; i < 7; i++) {
            let b = day + i
            let date = `${month}月${b}日`
            this.test.push(date)
        }
        // console.log(this.test);

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
