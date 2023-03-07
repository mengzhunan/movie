<template>
    <div class="cinema">
        <div class="item" v-for="h in c" :key="h.cinemaId">
            <div class="title">{{ h.title }}<span class="price">{{ h.price.n }}</span><span class="lowest">{{
                h.price.q }}</span></div>
            <div class="location">{{ h.location }}</div>
            <div class="services" v-if="h.services.length">
                <div class="page" :class="{ 'active': t.code == 'vipTag' || t.code == 'snack' }" v-for="(t, i) in h.services" :key="i">{{ t.text }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['c']
}
</script>

<style lang="scss" scoped>
.cinema>div:last-child {
    margin-bottom: 50rem;
}

.item {
    margin-left: 15rem;
    padding: 13rem 15rem 13rem 0;
    line-height: 24rem;
    border-bottom: 1px solid var(--btn-border);

    .title {
        font-size: 16rem;
        color: #000;

        span {
            color: var(--tab-active);
        }

        .price {
            font-size: 18rem;
            margin-left: 2rem;
        }

        .lowest {
            font-size: 12rem;
        }
    }

    .location {
        font-size: 13rem;
        color: var(--nav-black);
    }

    .services {
        display: flex;
        flex-wrap: wrap;

        .page {
            flex-shrink: 1;
            line-height: 18rem;
            padding: 0 3rem;
            margin: 4rem 4rem 0;
            border-radius: 2rem;
            color: #589daf;
            border: 1px solid #589daf;

            &.active {
                color: #ff9900;
                border: 1px solid #ff9900;

            }
        }
    }
}
</style>