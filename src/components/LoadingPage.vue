<template>
    <div class="loading">
        <img src="../assets/image/loading.png" alt=""><span>正在加载...</span>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@keyframes change-left {
    0% {
        transform: rotate(0deg)
    }

    50% {
        transform: rotate(-180deg)
    }

    100% {
        transform: rotate(-360deg);
    }
}

.loading {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14rem;
    padding: 10rem;

    img {
        animation: change-left 1s linear infinite;
        width: 22rem;
        height: 22rem;
        display: inline-block;
        margin-right: 4rem;
    }
}
</style>