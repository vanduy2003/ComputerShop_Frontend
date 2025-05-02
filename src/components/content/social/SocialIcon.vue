<template>
    <div class="social-icon">
        <div class="zalo-button">
            <a href="https://zalo.me/2645761204946529607">
                <img src="https://i.imgur.com/dXhNYR9.png" alt="">
            </a>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>
.social-icon {
    position: fixed;
    bottom: 40px;
    right: 20px;
    z-index: 1000;
}

.zalo-button {
    position: absolute;
    background: #0180c7;
    color: white;
    width: 57px;
    height: 57px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    bottom: 60px;
    right: 10px;
}

.zalo-button img {
    width: 50px;
    height: 50px;
}
</style>