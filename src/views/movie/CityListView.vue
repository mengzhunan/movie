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

        <van-index-bar>
            <van-index-anchor index="A" />
            <van-cell :title="a" v-for="a in this.A" :key="a" />

            <van-index-anchor index="B" />
            <van-cell :title="b" v-for="b in this.B" :key="b" />

            <van-index-anchor index="C" />
            <van-cell :title="c" v-for="c in this.C" :key="c" />

            <van-index-anchor index="D" />
            <van-cell :title="d" v-for="d in this.D" :key="d" />

            <van-index-anchor index="E" />
            <van-cell :title="e" v-for="e in this.E" :key="e" />

            <van-index-anchor index="F" />
            <van-cell :title="f" v-for="f in this.F" :key="f" />

            <van-index-anchor index="G" />
            <van-cell :title="g" v-for="g in this.G" :key="g" />

            <van-index-anchor index="H" />
            <van-cell :title="h" v-for="h in this.H" :key="h" />

            <van-index-anchor index="I" />
            <van-cell :title="i" v-for="i in this.I" :key="i" />

            <van-index-anchor index="J" />
            <van-cell :title="j" v-for="j in this.J" :key="j" />

            <van-index-anchor index="K" />
            <van-cell :title="k" v-for="k in this.K" :key="k" />

            <van-index-anchor index="L" />
            <van-cell :title="l" v-for="l in this.L" :key="l" />

            <van-index-anchor index="M" />
            <van-cell :title="m" v-for="m in this.M" :key="m" />

            <van-index-anchor index="N" />
            <van-cell :title="n" v-for="n in this.N" :key="n" />

            <van-index-anchor index="O" />
            <van-cell :title="o" v-for="o in this.O" :key="o" />

            <van-index-anchor index="P" />
            <van-cell :title="p" v-for="p in this.P" :key="p" />

            <van-index-anchor index="Q" />
            <van-cell :title="q" v-for="q in this.Q" :key="q" />

            <van-index-anchor index="R" />
            <van-cell :title="r" v-for="r in this.R" :key="r" />

            <van-index-anchor index="S" />
            <van-cell :title="s" v-for="s in this.S" :key="s" />

            <van-index-anchor index="T" />
            <van-cell :title="t" v-for="t in this.T" :key="t" />

            <van-index-anchor index="U" />
            <van-cell :title="u" v-for="u in this.U" :key="u" />

            <van-index-anchor index="V" />
            <van-cell :title="v" v-for="v in this.V" :key="v" />

            <van-index-anchor index="W" />
            <van-cell :title="w" v-for="w in this.W" :key="w" />

            <van-index-anchor index="X" />
            <van-cell :title="x" v-for="x in this.X" :key="x" />

            <van-index-anchor index="Y" />
            <van-cell :title="y" v-for="y in this.Y" :key="y" />

            <van-index-anchor index="Z" />
            <van-cell :title="z" v-for="z in this.Z" :key="z" />

        </van-index-bar>
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