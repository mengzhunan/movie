<template>
    <div class="personnel">
        <div class="top">
            <div class="name">演职人员</div>
            <div class="txt">全部<van-icon name="arrow" /></div>
        </div>
        <div class="roll-wrapper">
            <div class="roll-content">
                <div class="actor" v-for="(m,i) in actor" :key="i">
                    <div class="cover">
                        <van-image lazy-load :src="m.avatar" alt="" class="auto-img" />
                    </div>
                    <div class="title">
                        <div class="name">{{ m.cnm }}</div>
                        <div class="role">{{ m.desc }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['actor']
}
</script>

<style lang="scss" scoped>
.personnel {
    margin-top: 18rem;
}

.top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10rem 0 15rem 0;

    .name {
        font-size: 15rem;
        color: #fff;
    }

    .txt {
        font-size: 12rem;
        color: var(--text-grey);
    }
}

.roll-wrapper {
    width: 100%;
    overflow: auto;
}

.roll-content {
    display: flex;
    flex-wrap: nowrap;
}

.actor {
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
    }

    .title {
        text-align: center;
        width: 85rem;
        font-size: 12rem;

        .name,
        .role {
            line-height: 18rem;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }

        .name {
            color: #fff;
        }

        .role {
            color: var(--text-grey);
        }
    }
}
</style>