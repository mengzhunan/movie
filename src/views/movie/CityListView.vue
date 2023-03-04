<template>
    <div class="city">
        <van-index-anchor index="定位城市" />
        <van-cell class="cell">{{ cityLocation.city }}</van-cell>

        <van-index-anchor index="最近访问城市" />
        <van-cell class="cell">
            <div class="near">
                <div class="item">1223</div>
                <div class="item">134</div>
                <div class="item">1344</div>
            </div>
        </van-cell>

        <van-index-anchor class="city-title" index="热门城市" />
        <van-cell class="cell">
            <div class="city-list">
                <div class="city-item" v-for="(h, i) in hotList" :key="i" @click="city(h)">{{ h }}</div>
            </div>
        </van-cell>
    </div>
</template>

<script>
import { cityListAPI, cityBasePointAPI, cityLocationAPI } from "@/apis/index";
import { mapState, mapMutations } from "vuex";
export default {
    data() {
        return {
            cityList: [],
            hotList: [],
            positioning: ''
        }
    },

    computed: {
        ...mapState(['cityLocation'])
    },

    mounted() {
        this.hide();
        cityListAPI().then((data) => {
            this.hotList = data.hot;
            this.cityList = data.cts;
        })
    },

    methods: {
        ...mapMutations(['hide', 'position']),

        city(event) {
            cityBasePointAPI(event).then((data) => {
                let { location } = data.data.result
                cityLocationAPI(location.lat, location.lng).then((res) => {
                    this.position(res.data)
                    this.$router.push("/")
                })
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.city {
    background-color: var(--city-bg);

    .city-title {
        color: var(--nav-active-black)
    }
}

.cell {
    display: flex;
    background-color: #f5f5f5;

    .near {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;

        .item {
            background-color: #fff;
            border: 1px solid #e6e6e6;
            flex-shrink: 1;
            width: 100rem;
            height: 34rem;
            line-height: 34rem;
            text-align: center;
        }
    }

    .city-list {
        display: flex;
        flex-wrap: wrap;

        .city-item {
            background-color: #fff;
            border: 1px solid #e6e6e6;
            flex-shrink: 1;
            width: 100rem;
            height: 34rem;
            line-height: 34rem;
            text-align: center;
            margin: 15rem 7rem 0;
        }
    }
}
</style>