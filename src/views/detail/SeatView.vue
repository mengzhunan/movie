<template>
    <div class="seat">
        <div class="navbar">
            <van-icon name="arrow-left" class="back" @click="$router.go(-1)" />
            <div class="navbar-title">{{ seatData.cinema?.cinemaName }}</div>
        </div>

        <div class="content">
            <div class="regions">
                <div class="top">
                    <div class="hall"></div>
                    <div>3号厅</div>
                </div>
                <div>位置</div>
                <div>位置</div>
                <div>位置</div>
                <div>位置</div>
                <div>位置</div>
                <div>位置</div>
                <div>位置</div>
            </div>
            <div class="message">
                <van-notice-bar left-icon="volume-o" :text="seatData.reminder?.notice[0].detail" />
                <div>
                    <div class="title">
                        <div class="name">
                            <div class="movie-name">{{ seatData.movie?.movieName }}</div>
                            <div class="session">切换场次<van-icon name="arrow-down" /></div>
                        </div>
                        <div class="show">
                            <span>{{ show?.dateDesc }}</span>
                            <span>{{ show?.showDate }}</span>
                            <span>{{ show?.showTime }}-{{ show?.endTime }}</span>
                            <span>{{ show?.lang }}</span>
                            <span>{{ show?.dim }}</span>
                        </div>
                        <div class="show-list">
                            <div class="lump" v-for="(r, i) in seatData?.relatedShow"
                                :class="{ 'active': show?.showTime == r.showTime }" :key="i" @click="content(r)">
                                <div>{{ r.showTime }}</div>
                                <div class="lang">{{ r.lang }}{{ r.dim }}</div>
                                <div>￥{{ r.price }}</div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <van-button class="btn" type="primary" round block>请先选座</van-button>
        </div>

    </div>
</template>

<script>
import { seatSelectionAPI } from "@/apis/index"
import { mapMutations } from "vuex"

export default {
    data() {
        return {
            seatData: {},
            show: {
                dateDesc: "今天",
                dim: "2D",
                endTime: "15:55",
                ang: "国语",
                price: "38",
                seqNo: "202111230692093",
                showDate: "11月23日",
                showId: 692093,
                showTime: "14:10"
            },
        }
    },

    mounted() {
        this.hide();
        seatSelectionAPI().then((res) => {
            console.log(res);
            this.seatData = res.data
        })
    },

    methods: {
        ...mapMutations(["hide"]),

        content(event) {
            // console.log(event);
            this.show = event
        }
    },

}
</script>

<style lang="scss" scoped>
.seat {
    background-color: #F6F6F6;
}

.navbar {
    display: flex;
    align-items: center;
    height: 50rem;
    padding: 6rem;
    color: var(--bg-white);
    background-color: var(--theme-color);

    .back {
        width: 34.7rem;
        height: 34.7rem;
        font-size: 24rem;
        text-align: center;
        line-height: 34.7rem;
    }

    .navbar-title {
        flex: 1;
        text-align: center;
        font-size: 18rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}

.content {
    position: relative;
    padding: 0 10rem;

    .regions {
        width: 100%;
        position: relative;
        height: 330rem;
        padding-top: 50rem;

        .hall {
            position: absolute;
            top: 20rem;
            left: 40rem;
            width: 271px;
            height: 30px;
            pointer-events: none;
            background: url('../../assets/image/screen.png') no-repeat top;
            background-size: 200rem;
        }
    }

    .message {
        overflow: hidden;
        margin: 20rem 0;
        padding-bottom: 15rem;
        border-radius: 12rem;
        font-size: 13rem;
        background-color: #fff;
        box-shadow: 0 1px 8px 0 rgb(0 0 0 / 3%);
    }

    .title {
        margin: 15rem 10rem 0;

        .name {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 6rem;
        }

        .movie-name {
            font-size: 15rem;
        }

        .session {
            color: #2f8df9
        }

        .show {
            color: var(--nav-black);

            >span {
                display: inline-block;
                margin-right: 4rem;
            }
        }

        .show-list {
            margin-top: 15rem;
            display: flex;
            align-items: center;
            flex-wrap: wrap;

            .lump {
                flex-shrink: 1;
                width: 70rem;
                height: 67rem;
                margin: 0 12rem 12rem 0;
                border-radius: 4rem;
                background-color: #fff5f5;

                >div {
                    text-align: center;
                    line-height: 20rem;
                }

                .lang {
                    color: #999
                }

                &.active {
                    border: 1px solid var(--theme-color);
                }
            }

        }
    }

    .btn {
        border: none;
        background-image: -webkit-linear-gradient(right, rgba(255, 123, 16, .98), rgba(255, 154, 15, .98));
    }
}
</style>