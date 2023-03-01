<template>
    <div class="stay-movie">
        <div class="most-expected">
            <p class="title">近期最受期待</p>
            <div class="roll-wrapper">
                <div class="roll-content">
                    <div class="movie" v-for="m in stayMovie" :key="m.id" @click="$router.push(`/detail/${m.id}`)">
                        <div class="cover">
                            <van-image lazy-load :src="m.img" alt="" class="auto-img" />
                            <div class="score">{{ m.wish }} 人想看</div>
                        </div>
                        <div class="name">{{ m.nm }}</div>
                        <div class="time">{{ m.comingTitle }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { stayMovieAPI } from '@/apis';
export default {
    data() {
        return {
            stayMovie: [],
        }
    },
    mounted() {
        stayMovieAPI().then(data => {
            this.stayMovie = data.coming
            console.log(this.stayMovie);
        })
    }
}
</script>

<style lang="scss" scoped>
::-webkit-scrollbar {
    display: none;
}

.stay-movie {
    background-color: var(--bg-white);

    .most-expected {
        width: 375.2rem;
        height: 214.6rem;
        padding: 11.6rem 14.5rem;

        .title {
            width: 100%;
            height: 20.2rem;
            line-height: 20.2rem;
            font-size: 13.4rem;
            margin-bottom: 11.6rem;
        }

        .roll-wrapper {
            width: 100%;
            height: 100%;
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
    }
}
</style>