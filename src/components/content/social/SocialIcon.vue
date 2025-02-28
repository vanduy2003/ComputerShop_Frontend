<template>
    <div class="social-icon">
        <div class="chat-button">
            <a href="">
                <img src="https://i.imgur.com/MJv345N.png" alt="">
            </a>
        </div>
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

.chat-button {
    background: linear-gradient(315deg, rgb(0, 10, 204) 15.28%, rgb(2, 120, 255) 84.72%) !important;
    color: white;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    margin-bottom: 20px;
}

.chat-button img {
    width: 30px;
    height: 30px;
}

.zalo-button {
    background: #0180c7;
    color: white;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.zalo-button img {
    width: 50px;
    height: 50px;
}
</style>