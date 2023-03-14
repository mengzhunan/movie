<template>
    <div>
        <div class="map">
            <baidu-map class="map" :center="{ lng: this.cinema.lng, lat: this.cinema.lat }" :zoom="15">
                <bm-marker :position="{ lng: this.cinema.lng, lat: this.cinema.lat }" :dragging="true"
                    animation="BMAP_ANIMATION_BOUNCE">
                    <bm-label :content="cinema.nm" :labelStyle="{ color: 'red', fontSize: '12rem' }"
                        :offset="{ width: -35, height: 30 }" />
                </bm-marker>
            </baidu-map>
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
import { mapMutations } from 'vuex'

export default {
    data() {
        return {
            cinema: JSON.parse(this.$route.query.content),
            center: { lng: 0, lat: 0 }
        }
    },
    methods: {
        ...mapMutations(["hide"]),
    },
    mounted() {
        this.hide();
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
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .addr {
        font-size: 13rem;
        height: 15rem;
        margin-top: 4rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

}
</style>