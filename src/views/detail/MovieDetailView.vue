<template>
    <div class="movie-info">

        <div class="movie-info-top">
            <div class="movie-cover">
                <van-image lazy-load :src="movieDetail.img" alt="" class="auto-img" />
            </div>
            <div class="movie-desc">
                <div class="name">{{ movieDetail.nm }}</div>
                <div class="movie-desc-top">
                    <div class="name-eg">{{ movieDetail.enm }}</div>
                    <div class="info">
                        <div class="type">{{ movieDetail.cat }}</div>
                        <div class="actors">{{ movieDetail.star }}</div>
                        <div class="time">{{ movieDetail.onlineDate }}/{{ movieDetail.episodeDur }}分钟</div>
                    </div>
                </div>
                <div class="btns"><van-icon class="icon" name="like-o" />想看</div>

            </div>
        </div>

    </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { movieDetailAPI } from '@/apis';
export default {
    props: ['id'],
    data() {
        return {
            movieDetail: {},
        }
    },

    mounted() {
        this.hide();
        movieDetailAPI(this.id).then(data => {
            this.movieDetail = data.movie
            console.log(data)
        })
    },

    methods: {
        ...mapMutations(['hide']),
    }
}
</script>

<style lang="scss" scoped>
.movie-info {
    background-color: #572723;
    padding: 20rem 16rem;
}

.movie-info-top {
    display: flex;
}

.movie-cover {
    width: 100rem;
    height: 138rem;

    .auto-img {
        width: 100%;
        height: 100%;
        display: block;
    }
}

.movie-desc {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 12rem;
    color: #fff;

    .name {
        font-size: 20rem;
        font-weight: 700;
        margin-bottom: 10rem;
    }

    .movie-desc-top {
        flex: 1;
        font-size: 12rem;
        line-height: 18rem;
        color: rgba(255, 255, 255, .6)
    }
}

.btns {
    width: 110rem;
    height: 30rem;
    line-height: 30rem;
    background: hsla(0, 0%, 100%, .35);
    box-shadow: 0 0.02rem 0.08rem 0 rgb(0 0 0 / 10%);
    border-radius: 4rem;
    text-align: center;

    .icon {
        margin-right: 4rem;
    }
}
</style>