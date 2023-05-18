<template>
    <div class="seat">
        <div class="navbar">
            <van-icon name="arrow-left" class="back" @click="$router.go(-1)" />
            <div class="navbar-title">{{ seatData.cinema?.cinemaName }}</div>
        </div>

        <div class="content">
            <div class="regions">
                <div class="top">
                    <div class="screen"></div>
                    <div class="hall">3号厅</div>
                </div>
                <div class="place">
                    <div class="rows" v-for="r in seat.rows" :key="r.rowId">
                        <div class="row">{{ r.rowId }}</div>
                        <div class="serial" :style="[(column == s.columnId && row == r.rowNum) ? bgStyle : '']"
                            v-for="s in r.seats" :key="s.columnId" v-show="s.columnId"
                            :class="[s.seatStatus == 1 ? 'select' : s.seatStatus == 3 ? 'sell' : 'no']"
                            @click="s.seatStatus == 1 && pick(r.rowNum, s.columnId)">
                        </div>
                    </div>
                </div>
            </div>

            <div class="message">
                <div class="graph">
                    <div class="selectable">可选</div>
                    <div class="sold">已售</div>
                    <div class="unprocurable">不可售</div>
                </div>

                <div class="contents">
                    <van-notice-bar left-icon="volume-o" :text="seatData.reminder?.notice[0].detail" />
                    <div class="title">
                        <div class="name">
                            <div class="movie-name">{{ seatData.movie?.movieName }}</div>
                            <div class="session" v-show="!showState" @click="switchover">切换场次<van-icon name="arrow-down" />
                            </div>
                            <div class="session" v-show="showState" @click="switchover">切换场次<van-icon name="arrow-up" />
                            </div>
                        </div>
                    </div>

                    <div class="show">
                        <span>{{ show?.dateDesc }}</span>
                        <span>{{ show?.showDate }}</span>
                        <span>{{ show?.showTime }}-{{ show?.endTime }}</span>
                        <span>{{ show?.lang }}</span>
                        <span>{{ show?.dim }}</span>
                    </div>

                    <div class="roll-wrapper">
                        <div class="roll-content">
                            <div class="show-list" v-show="showState">
                                <div class="lump" v-for="(r, i) in seatData?.relatedShow"
                                    :class="{ 'active': show?.showTime == r.showTime }" :key="i" @click="content(r)">
                                    <div>{{ r.showTime }}</div>
                                    <div class="lang">{{ r.lang }}{{ r.dim }}</div>
                                    <div>￥{{ r.price }}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="chunk">
                        <div class="c-content" v-for="(b, i) in ballot" :key="i">
                            <div>{{ b.mark }}</div>
                            <div>{{ b.price }}</div>
                            <div class="btn"><van-icon size="12" name="cross" /></div>
                        </div>
                    </div>

                </div>
            </div>
            <div class="btn-box">
                <van-button class="btn" type="primary" round block>请先选座</van-button>
            </div>
        </div>

    </div>
</template>

<script>
import { seatSelectionAPI } from "@/apis/index"
import { mapMutations } from "vuex"
import right from '../../assets/image/right.png'

export default {
    data() {
        return {
            seatData: {},
            show: '',
            showState: false,
            // 坐标图
            seat: {},
            // 位置坐标
            column: 0,
            row: 0,
            ballot: [],
        }
    },
    mounted() {
        this.hide();
        seatSelectionAPI().then((res) => {
            this.show = res.data.show
            this.seatData = res.data
            this.seat = res.data.seat?.regions[0]
        })
    },

    methods: {
        ...mapMutations(["hide"]),

        content(event) {
            this.show = event
        },

        switchover() {
            this.showState = !this.showState
        },

        pick(row, seat) {
            this.row = row;
            this.column = seat;

            let mark = `${row}排${seat}座`
            let place = {
                mark: mark,
                price: '￥38',
            }

            this.ballot.push(place);

        },
    },

    computed: {
        bgStyle() {
            return { backgroundImage: `url(${right})` }
        }
    }

}
</script>

<style lang="scss" scoped>
.seat {
    background-color: #F6F6F6;
    height: 92vh;
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
    height: 100%;
    padding: 0 10rem;
}

.regions {
    width: 100%;
    position: relative;
    height: 330rem;
    padding-top: 50rem;

    .screen {
        position: absolute;
        top: 20rem;
        left: 40rem;
        width: 271px;
        height: 30px;
        pointer-events: none;
        background: url('../../assets/image/screen.png') no-repeat top;
        background-size: 200rem;
    }

    .hall {
        text-align: center;
        font-size: 14rem;
        line-height: 18rem;
        color: var(--nav-black);
    }
}

.place {
    >div:first-child {
        >div:first-child {
            border-radius: 10rem 10rem 0 0;
        }
    }

    >div:last-child {
        >div:first-child {
            border-radius: 0 0 10rem 10rem;
        }
    }

    .rows {
        display: flex;
        align-items: center;

        .row {
            color: #fff;
            border: none;
            width: 18rem;
            text-align: center;
            font-size: 12rem;
            background-color: #777;
            padding: 10rem 0;
            margin: 0 80rem 0 0;
        }

        .serial {
            margin-right: 6rem;
            width: 16rem;
            height: 16rem;
            border-radius: 2rem;


            &.select {
                background: url('../../assets/image/selec.png') no-repeat;
                background-size: 100% 100%;
            }

            &.sell {
                background: url('../../assets/image/purchased.png') no-repeat;
                background-size: 100% 100%;
            }

            &.no {
                background: url('../../assets/image/no.png') no-repeat;
                background-size: 100% 100%;
            }

            &.bg {
                background: url('../../assets/image/right.png') no-repeat;
            }
        }
    }
}

.message {
    margin: 20rem 0 10rem 0;
    width: 100%;
    font-size: 13rem;
    box-shadow: 0 1px 8px 0 rgb(0 0 0 / 3%);
    position: absolute;
    bottom: 50rem;
    left: 0;

    .contents {
        background-color: #fff;
        overflow: hidden;
        border-radius: 12rem;
        margin: 0 10rem;
        padding-bottom: 15rem;

    }
}

.graph {
    box-sizing: border-box;
    display: flex;
    position: absolute;
    color: #999;
    top: -26rem;
    left: 50%;
    transform: translateX(-40%);


    >div {
        margin-right: 30rem;
    }

    .selectable::before {
        content: ' ';
        position: absolute;
        left: -16rem;
        width: 12rem;
        height: 12rem;
        border-radius: 2rem;
        background-color: #ffffff;
        border: 1px solid #dfdfdf
    }

    .sold::before {
        content: ' ';
        position: absolute;
        left: 41rem;
        width: 12rem;
        height: 12rem;
        border-radius: 2rem;
        background: url(../../assets/image/purchased.png) no-repeat;
        background-size: 100% 100%;
        border: 1px solid #dfdfdf
    }

    .unprocurable::before {
        content: ' ';
        position: absolute;
        left: 94rem;
        width: 12rem;
        height: 12rem;
        border-radius: 2rem;
        background-color: #eaeaea;
        border: 1px solid #dfdfdf
    }
}

.title {
    width: 100%;
    margin: 15rem 0 0;

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
}

.show {
    color: var(--nav-black);

    >span {
        display: inline-block;
        margin-right: 4rem;
    }
}

.roll-wrapper {
    width: 100%;
    overflow: auto;

    .roll-content {
        display: flex;
        flex-wrap: nowrap;
    }
}

.show-list {
    margin-top: 15rem;
    display: flex;
    flex-wrap: nowrap;

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
            background-color: #ffebeb;
        }
    }
}

.chunk {
    margin-top: 6rem;
    display: flex;
    flex-wrap: wrap;

    .c-content {
        height: 46rem;
        width: 76rem;
        margin: 4rem;
        border-radius: 4rem;
        padding: 0 20rem 0 10rem;
        font-size: 12rem;
        position: relative;
        background-color: #dfdfdf;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        >div:first-child {
            margin-bottom: 6rem;
        }

        .btn {
            position: absolute;
            right: 2rem;
            top: 17rem;
        }
    }
}

.btn-box {
    width: 100%;
    padding: 0 10rem;
    box-sizing: border-box;
    position: absolute;
    bottom: 6rem;
    left: 0;

    .btn {
        border: none;
        background-image: -webkit-linear-gradient(right, rgba(255, 123, 16, .98), rgba(255, 154, 15, .98));
    }
}
</style>