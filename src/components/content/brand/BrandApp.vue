<template>
    <div class="brand">
        <section class="list-brand my-5">
            <div class="container background-white">
                <h2 class="title">Thương hiệu đồng hành</h2>
                <div class="slider-brand">
                    <swiper :slides-per-view="8" :space-between="10" :autoplay="{
                        delay: 3000, // Thời gian chờ giữa các slide (3 giây)
                        disableOnInteraction: false, // Tự động tiếp tục chạy ngay cả khi người dùng tương tác
                    }" :loop="true" :pagination="{ clickable: true }" :modules="modules" class="mySwiper">
                        <swiper-slide v-for="brand in brandList" :key="brand.id">
                            <div class="feedback-img text-center">
                                <img :src="brand.logoUrl" :alt="brand.name" />
                            </div>
                        </swiper-slide>
                    </swiper>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";  // ✅ Đảm bảo import CSS autoplay
import { Autoplay, Navigation, Pagination } from "swiper/modules";

export default {
    components: {
        Swiper,
        SwiperSlide,
    },
    data() {
        return {
            brandList: [],
        };
    },
    mounted() {
        this.fetchDataBrand();
    },
    methods: {
        async fetchDataBrand() {
            try {
                const response = await axios.get("http://localhost:3000/api/v1/data/brands");
                this.brandList = response.data;
            } catch (error) {
                console.error(error);
            }
        },
    },
    setup() {
        return {
            modules: [Autoplay, Navigation, Pagination], // Đảm bảo đã đăng ký đúng các module
        };
    },
};
</script>

<style scoped>
.list-brand .title {
    font-size: 24px;
    font-weight: 700;
    text-transform: uppercase;
    border-bottom: 3px solid var(--blue, #3278f6);
    padding-bottom: 3px;
    display: inline-block;
    margin-bottom: 24px;
}

/* feedback-slider */

.feedback-slider {
    margin-top: 20px;
}

.feedback-item-group {
    display: flex;
    justify-content: space-between;
    gap: 10px;
}

.feedback-img img {
    width: 80px;
    height: 80px;
    object-fit: contain;
}
</style>
