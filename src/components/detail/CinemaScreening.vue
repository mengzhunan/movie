<template>
    <div class="movie" @click="ticket(cinemas.id)">
        <div class="top">
            <div class="title van-ellipsis">{{ cinemas.name }}</div>
            <div class="price">{{ cinemas.sellPrice }}<span>元起</span></div>
        </div>
        <div class="address">
            <div class="addr van-ellipsis">{{ cinemas.addr }}</div>
            <div class="distance">{{ cinemas.distance }}</div>
        </div>
        <div class="tag">
            <div class="label" v-for="(l, i) in cinemas.labels" :key="i"
                :style="{ color: l.color, border: `1px solid ${l.color}` }">{{
                    l.name }}
            </div>
        </div>
        <div class="show">{{ cinemas.showTimes }}</div>
    </div>
</template>

<script>
export default {
    props: ['cinemas'],
    methods: {
        ticket(id) {
            console.log(id);
            this.$router.push(`/cinema/${id}`)
            // this.$router.replace(`detail/${id}`)
        }
    }

}
</script>

<style lang="scss" scoped>
@mixin center {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.movie {
    margin-left: 15rem;
    padding: 13rem 15rem 13rem 0;

    .top {
        @include center;

        .title {
            font-size: 16rem;
            color: #000;
        }

        .price {
            font-size: 18rem;
            white-space: nowrap;
            color: var(--tab-active);

            >span {
                margin-left: 3rem;
                font-size: 12rem;
            }
        }
    }

    .address {
        margin-top: 6rem;
        @include center;
        color: var(--nav-black);

        .distance {
            margin-left: 10rem;
        }

    }

    .tag {
        margin-top: 2rem;
        display: flex;
        align-items: center;
        flex-wrap: wrap;

        .label {
            flex-shrink: 1;
            padding: 2rem 4rem;
            margin: 4rem 4rem 0 0;
            border-radius: 2rem;
        }

    }

    .show {
        margin-top: 6rem;
        color: #999;
    }

}
</style>