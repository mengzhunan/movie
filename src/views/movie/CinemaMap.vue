<template>
    <div>
        <div class="map">
            <baidu-map class="map" :center="center" :zoom="zoom" @ready="handler"></baidu-map>
        </div>
        <div>
            <div class="title">
                <div class="name">
                    {{ cinema.nm }}
                </div>
                <div class="addr">
                    {{ cinema.addr }}
                </div>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            cinema: this.$route.query.content,
            center: { lng: 0, lat: 0 },
            zoom: 3
        }
    },
    mounted() {
        console.log(this.cinema);
    },
    methods: {
        handler({ BMap, map }) {
            console.log(BMap, map)
            this.center.lng = 116.404
            this.center.lat = 39.915
            this.zoom = 15
        }
    }
}
</script>

<style lang="scss" scoped>
.map {
    width: 100%;
    height: calc(100vh - 74rem);
}

.title {
    width: 100%;
    height: 74rem;
    padding: 19rem 16rem 17rem 18rem;
    background-color: #fff;
    position: absolute;
    bottom: 0;

    .name {
        height: 19rem;
        line-height: 19rem;
        font-size: 17rem;
    }

    .addr {
        font-size: 13rem;
        height: 15rem;
        margin-top: 4rem;
    }

}
</style>