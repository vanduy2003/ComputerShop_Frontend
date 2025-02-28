<template>
    <div class="feetback">
        <section className="feedback-customer mt-5">
            <div className="container">
                <div className="content-feedback">
                    <div class="top-content-feedback text-center p-3">
                        <b>Cảm ơn </b>
                        <b class="red">1.000.000+ </b>
                        <b>KHÁCH HÀNG ĐÃ VÀ ĐANG CHỌN</b>
                        <div class="list-star d-flex justify-content-center m-2">
                            <i className="icon-star star5"></i>
                        </div>
                        <img src="./images/logo.png" width="140px" height="70px" alt="logo" />
                    </div>
                    <div className="slider-feedback">
                        <div class="feedback-slider">
                            <div class="container">
                                <swiper :slides-per-view="4" :space-between="10" :loop="true" :autoplay="{
                                    delay: 3000, // Thời gian chờ giữa các slide (3 giây)
                                    disableOnInteraction: false, // Tự động tiếp tục chạy ngay cả khi người dùng tương tác
                                }" :pagination="{ clickable: true }" :modules="modules" class="mySwiper">
                                    <swiper-slide v-for="brand in productList" :key="brand.id">
                                        <div class="feedback-img">
                                            <img :src="brand.src" :alt="brand.name" />
                                        </div>
                                    </swiper-slide>
                                </swiper>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";  // ✅ Đảm bảo import CSS autoplay
import { Autoplay, Navigation, Pagination } from "swiper/modules";

export default {
    data() {
        return {
            productList: [
                { src: "/images/s1.jpg" },
                { src: "/images/s2.jpg" },
                { src: "/images/s3.jpg" },
                { src: "/images/s4.jpg" },
                { src: "/images/s5.jpg" },
                { src: "/images/s6.jpg" },
                { src: "/images/s4.jpg" },
                { src: "/images/s3.jpg" },
            ],
        };
    },
    components: {
        Swiper,
        SwiperSlide,
    },
    setup() {
        return {
            modules: [Autoplay, Navigation, Pagination], // Đảm bảo đã đăng ký đúng các module
        };
    },
};
</script>

<style scoped>
.feedback-customer {
    background: #29324e;
}

.top-content-feedback b {
    font-size: 30px;
    color: #fff;
    line-height: 28px;
    text-transform: uppercase;
}

.top-content-feedback .red {
    font-size: 40px;
    color: #fb4e4e;
    line-height: 40px;
}

.top-content-feedback .icon-star {
    background: url(https://www.tncstore.vn/static/assets/default/images/icon_star.png?v=1) no-repeat;
    display: block;
    background-size: 140px 170px;
    /* Tăng kích cỡ background */
}

.top-content-feedback .icon-star.star5 {
    width: 140px;
    /* Tăng chiều rộng */
    height: 30px;
    /* Tăng chiều cao */
    background-position: 0 0;
}

.top-content-feedback .icon-star.star4 {
    width: 60px;
    height: 12px;
    background-position: 0 -12px;
}

.top-content-feedback .icon-star.star3 {
    width: 60px;
    height: 12px;
    background-position: 0 -24px;
}

.top-content-feedback .icon-star.star2 {
    width: 60px;
    height: 12px;
    background-position: 0 -37px;
}

.top-content-feedback .icon-star.star1 {
    width: 60px;
    height: 12px;
    background-position: 0 -50px;
}

/* feedback-slider */
.feedback-img {
    height: 300px;
}

.feedback-slider {
    margin-top: 20px;
    padding-bottom: 40px;
}

.product-slider .container {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
}

.feedback-item-group {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    padding-bottom: 25px;
}

.feedback-img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
}
</style>
