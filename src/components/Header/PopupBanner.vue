<template>
    <div v-if="isVisible" class="popup-banner">
        <div class="popup-content">
            <a href="https://www.anphatpc.com.vn/media/marketing/APSN21/CTKM.html">
                <img src="https://anphat.com.vn/media/banner/03_Mar78d51a748cf506e836b6bbb9ef131248.png" alt=""></a>
            <i @click="closePopup" class="mdi mdi-close-circle-outline"></i>

        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // Quản lý trạng thái hiển thị banner
            isVisible: true,
        };
    },
    methods: {
        // Đóng popup
        closePopup() {
            this.isVisible = false;

        },
    },

};
</script>

<style scoped>
.popup-banner {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    padding: 10px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    height: 100vh;
}

.popup-content {
    position: relative;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    margin: 0 auto;
}

.popup-content img {
    max-width: 100%;
    height: auto;
    border-radius: 10px;
}

.popup-content i {
    position: absolute;
    background: none;
    border: none;
    color: #ffffff;
    font-size: 45px;
    cursor: pointer;
    position: absolute;
    top: 45px;
    right: 25px;
    border-radius: 50%;

}

.popup-content i:hover {
    color: rgb(232, 0, 0);
}
</style>