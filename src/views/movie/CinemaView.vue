<template>
    <div>
        <div class="menu">
            <div class="menu-content">

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
                                                @click="place(t, v)" />
                                        </div>
                                    </template>
                                </van-tree-select>
                            </van-tab>

                            <van-tab title="地铁站">
                                <van-tree-select height="100vw" :items="subway" :main-active-index.sync="active">
                                    <template #content>
                                        <div v-show="active === i" v-for="(t, i) in subway" :key="i">
                                            <van-cell v-for="(v, h) in t.children" :key="h" :title="v.name"
                                                @click="place(t, v)" />
                                        </div>
                                    </template>
                                </van-tree-select>
                            </van-tab>

                        </van-tabs>
                    </van-dropdown-item>
                    <!-- 品牌 -->
                    <van-dropdown-item v-model="value" :options="option" />
                    <!-- 特色 -->
                    <van-dropdown-item title="特色" ref="demo">
                        <div class="service">
                            <div class="s-title">特色功能</div>
                            <div class="s-content">
                                <div class="s-block" v-for="(s, index) in cinemaService" :key="s.id"
                                    :class="serviceClass == index ? 'actived' : ''" @click="characteristic(index)">{{ s.name
                                    }}
                                </div>
                            </div>
                        </div>
                        <div class="special">
                            <div class="special-title">特殊厅</div>
                            <div class="special-content">
                                <div class="special-block" v-for="(p, index) in special" :key="p.id"
                                    :class="activeClass == index ? 'actived' : ''" @click="unique(index)">{{ p.name }}</div>
                            </div>
                        </div>
                        <div class="btn">
                            <van-button class="button">重置</van-button>
                            <van-button class="button" type="danger" @click="onConfirm">确认</van-button>
                        </div>
                    </van-dropdown-item>

                </van-dropdown-menu>
            </div>

        </div>

        <div class="cinema-content">
            <CinemaCard :c="cinemaContent" />
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { cinemaScreeningAPI, nearbyCinemaAPI } from '@/apis/index'
import CinemaCard from '@/components/detail/CinemaCard.vue'

export default {

    components: {
        CinemaCard
    },

    data() {
        return {
            value: 0,
            title: '全城',
            active: 0,
            activeClass: -1,
            serviceClass: -1,
            cinemaContent: [],
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
        };
    },

    methods: {

        characteristic(i) {
            this.serviceClass = i
        },

        unique(i) {
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

        place(res, event) {
            this.$refs.item.toggle();

            if (event.name == "全部") {
                this.title = res.text.split('(')[0]
            } else {
                this.title = event.name
            }
        },

        onConfirm() {
            this.$refs.demo.toggle();
        }
    },


    mounted() {

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

        nearbyCinemaAPI(this.cityLocation.id, this.cityLocation.lat, this.cityLocation.lng).then((data) => {
            console.log(data);
            this.cinemaContent = data
        })

    },

    computed: {
        ...mapState(['cityLocation'])
    },
}
</script>

<style lang="scss" scoped>
.menu {
    height: 48rem;

    .menu-content {
        position: fixed;
        width: 100%;
        top: 94rem;
    }
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
</style>
