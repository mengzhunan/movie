<template>
    <div class="citys">
        <van-index-anchor index="定位城市" />
        <van-cell>
            <div class="position" @click="city(cityLocation.city)">{{ cityLocation.city }}</div>
        </van-cell>

        <van-index-anchor index="最近访问城市" />
        <div class="history">
            <div class="history-content">
                <div class="city" v-for="(h, i) in historyCity" :key="i" @click="city(h)">{{ h }}</div>
            </div>
        </div>

        <van-index-anchor class="city-title" index="热门城市" />
        <van-cell class="cell">
            <div class="city-list">
                <div class="city-item" v-for="(h, i) in hotList" :key="i" @click="city(h)">{{ h }}</div>
            </div>
        </van-cell>

        <van-index-bar :sticky="false">
            <div v-for="(item, name) in cityList" :key="name">
                <van-index-anchor :index="name" v-if="item.length" />
                <div class="place-content">
                    <div v-for="c in item" :key="c.id" class="place" @click="city(c.nm)">{{ c.nm }}</div>
                </div>
            </div>
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
            initials: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
            historyCity: [],
        }
    },

    computed: {
        ...mapState(['cityLocation'])
    },

    created() {

        if (!localStorage.recentVisit) {
            return
        }

        let recentVisit = JSON.parse(localStorage.recentVisit || "[]");
        this.historyCity = recentVisit.splice(0, 3)
    },

    mounted() {
        this.hide();

        cityListAPI().then((data) => {
            this.hotList = data.hot;

            let cityName = {};
            this.initials.forEach(init => {
                cityName[init] = [];
                data.cts.forEach(c => {
                    let first = c.py.substring(0, 1).toUpperCase();
                    if (init == first) {
                        cityName[init].push(c)
                    }
                })
            })
            this.cityList = cityName
        })
    },

    methods: {
        ...mapMutations(['hide', 'position']),

        city(event) {

            cityBasePointAPI(event).then((data) => {
                
                let { location } = data.data.result
                cityLocationAPI(location.lat, location.lng).then((res) => {
                    this.position(res.data)
                    
                })
            })
            this.$router.push("/")
            let recentVisit = JSON.parse(localStorage.recentVisit || "[]");
            recentVisit = [event, ...recentVisit.filter(e => e != event)];
            localStorage.recentVisit = JSON.stringify(recentVisit)
        }
    }
}
</script>

<style lang="scss" scoped>
.citys {
    background-color: var(--city-bg);

    .city-title {
        color: var(--nav-active-black)
    }
}

.position {
    background-color: #fff;
    border: 1px solid var(--btn-border);
    height: 34rem;
    font-size: 14rem;
    line-height: 34rem;
    text-align: center;
}

.history {
    padding: 0 30rem 8rem 0;
    background-color: var(--bg-black);

    .history-content {
        display: flex;

        .city {
            width: 92rem;
            height: 34rem;
            padding: 0 6rem;
            text-align: center;
            line-height: 34rem;
            margin: 15rem 0 0 24rem;
            background-color: #fff;
            border: 1px solid var(--btn-border);
            max-width: 100rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

    }
}



.cell {
    display: flex;
    background-color: var(--bg-black);
    font-size: 12rem;

    .city-list {
        display: flex;
        flex-wrap: wrap;

        .city-item {
            background-color: #fff;
            border: 1px solid var(--btn-border);
            flex-shrink: 1;
            width: 100rem;
            height: 34rem;
            line-height: 34rem;
            text-align: center;
            margin: 15rem 7rem 0;
        }
    }
}

.place-content {
    padding: 0 30rem 0 15rem;
    background-color: var(--bg-black);
    font-size: 12rem;

    .place {
        height: 44rem;
        line-height: 44rem;
        border-bottom: 1px solid #c8c7cc;
    }

    .place:last-child {
        border-bottom: none;
    }

}
</style>