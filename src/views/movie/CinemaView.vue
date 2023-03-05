<template>
    <div>

        <van-dropdown-menu>
            <van-dropdown-item :title="title">
                <van-tabs line-width="180rem" line-height="1rem" color="var(--tab-active)"
                    title-active-color="var(--tab-active)" v-if="business.length">

                    <van-tab title="商区">
                        <van-tree-select height="100vw" :items="business" :main-active-index.sync="active">
                            <template #content>
                                <div v-show="active === i" v-for="(t, i) in business" :key="i">
                                    <van-cell v-for="(v, h) in t.children" :key="h" :title="v.name" @click="place(t, v)" />
                                </div>
                            </template>
                        </van-tree-select>
                    </van-tab>

                    <van-tab title="地铁站">
                        <van-tree-select height="100vw" :items="subway" :main-active-index.sync="active">
                            <template #content>
                                <div v-show="active === i" v-for="(t, i) in subway" :key="i">
                                    <van-cell v-for="(v, h) in t.children" :key="h" :title="v.name" @click="place(t, v)" />
                                </div>
                            </template>
                        </van-tree-select>
                    </van-tab>

                </van-tabs>
            </van-dropdown-item>

            <van-dropdown-item title="品牌">
                <div>{{ cityLocation.city }}</div>
                <div>{{ cityLocation.id }}</div>
            </van-dropdown-item>
            <van-dropdown-item title="筛选" ref="item">
                <div>123</div>
            </van-dropdown-item>
        </van-dropdown-menu>

    </div>
</template>

<script>
import { mapState } from 'vuex';
import { cinemaScreeningAPI } from '@/apis/index'

export default {

    data() {
        return {
            value: 0,
            title: '全城',
            active: 0,
            business: [],
            subway: [],
        };
    },

    methods: {

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
            if (event.name == "全部") {
                this.title = res.text.split('(')[0]
            } else {
                this.title = event.name
            }

            // console.log(res);
            // console.log(123, event);
        }
    },



    mounted() {
        cinemaScreeningAPI(this.cityLocation.id).then((data) => {
            console.log(data);
            // 商区
            // let items = [];
            // data.district?.subItems.forEach(a => {
            //     let set = {
            //         id: a.id,
            //         text: `${a.name}(${a.count})`,
            //         children: a.subItems,
            //     }
            //     items.push(set)
            // })

            this.business = this.content(data.district?.subItems)
            this.subway = this.content(data.subway?.subItems)
            // console.log(123,items);
            // this.business = items
        })
    },

    computed: {
        ...mapState(['cityLocation'])
    },
}
</script>

<style lang="scss" scoped></style>
