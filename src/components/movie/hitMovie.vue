<template>
    <div class="goodReputation">
        <div class="title">{{ movie.title }}</div>
        <div class="roll-wrapper">
            <div class="roll-content">
                <div class="movie" v-for="m in movie.movieList" :key="m.movieId" @click="$router.push(`/detail/${m.movieId}`)">
                    <div class="cover">
                        <van-image lazy-load :src="m.poster" alt="" class="auto-img"/>
                        <div class="score">观众评分 {{ m.score }}</div>
                    </div>
                    <div class="name">{{ m.name }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { contentListAPI } from '@/apis/index'

export default {

    data() {    
        return {
            movie: [],
        }
    },
    mounted() {
        contentListAPI().then(data => {
            this.movie = data
        })
    }
}
</script>

<style lang="scss" scoped>
.title {
    font-size: 14rem;
    color: var(--nav-active-black);
    margin-bottom: 12rem;
}

.roll-wrapper {
    width: 100%;
    overflow: auto;
}

.roll-content {
    display: flex;
    flex-wrap: nowrap;
}

.movie {
    margin-right: 10rem;
    flex-shrink: 1;

    .cover {
        height: 115rem;
        width: 85rem;
        margin-bottom: 6rem;
        position: relative;

        .auto-img {
            width: 100%;
            height: 100%;
            display: block;
        }

        .score {
            position: absolute;
            z-index: 3;
            color: var(--score-yellow);
            font-size: 12rem;
            font-weight: 600;
            left: 2rem;
            bottom: 6rem;
        }

        &::after {
            display: inline-block;
            position: absolute;
            content: '';
            bottom: 0;
            left: 0;
            width: 100%;
            height: 35rem;
            background-image: linear-gradient(-180deg, rgba(77, 77, 77, 0), #000)
        }
    }

    .name {
        width: 85rem;
        height: 20rem;
        font-weight: bold;
        color: var(--movie-name-black);
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        margin-bottom: 3rem;
    }
}
</style>