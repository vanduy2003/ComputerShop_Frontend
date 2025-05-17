<template>
    <div>
        <!-- Carousel -->
        <div class="carousel-container">
            <v-carousel cycle :interval="5000" v-model="activeSlide" height="500px"
                class="main-carousel custom-carousel">
                <v-carousel-item v-for="(item, index) in images" :key="index">
                    <img :src="item.src" alt="Slide" class="carousel-image" />
                </v-carousel-item>
            </v-carousel>

            <!-- Thumbnails -->
            <div class="thumbnail-container">
                <div v-for="(item, index) in images" :key="index" class="thumbnail"
                    :class="{ active: index === activeSlide }" @click="activeSlide = index">
                    <img :src="item.src" alt="Thumbnail" />
                </div>
            </div>
        </div>

        <!-- Product Slider -->
        <div class="product-slider">
            <div class="container">
                <swiper :slides-per-view="4" :space-between="10" :loop="true" :autoplay="{
                    delay: 3000,
                    disableOnInteraction: false,
                }" :pagination="{ clickable: true }" :navigation="true" :modules="modules" class="mySwiper">
                    <swiper-slide v-for="braner in bannerList" :key="braner.id">
                        <div class="feedback-img product-item">
                            <router-link :to="`/category/${braner.branerId}`">
                                <img :src="braner.src" :alt="braner.name" />
                            </router-link>
                        </div>
                    </swiper-slide>
                </swiper>
            </div>
        </div>
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
    components: {
        Swiper,
        SwiperSlide,
    },

    setup() {
        return {
            modules: [Autoplay, Navigation, Pagination], // ✅ Khai báo modules trong setup()
        };
    },

    data() {
        return {
            activeSlide: 0,
            images: [
                { src: "https://www.tncstore.vn/media/banner/banner-trang-chu-pc-summer-sale.jpg" },
                { src: "/images/2.jpg" },
                { src: "/images/3.png" },
                { src: "/images/4.jpg" },
                { src: "/images/5.jpg" },
            ],
            bannerList: [
                { src: "/images/1a.jpg", branerId: 4 },
                { src: "/images/2a.jpg", branerId: 5 },
                { src: "/images/3a.jpg", branerId: 7 },
                { src: "/images/4a.jpg", branerId: 1 },
                { src: "/images/5a.jpg", branerId: 32 },
                { src: "/images/6a.jpg", branerId: 3 },
                { src: "/images/7a.jpg", branerId: 3 },
                { src: "/images/8a.jpg", branerId: 2 },
                { src: "/images/5a.jpg", branerId: 7 },
                { src: "/images/6a.jpg", branerId: 7 },
                { src: "/images/7a.jpg", branerId: 7 },
                { src: "/images/8a.jpg", branerId: 2 },
            ],
        };
    },
};
</script>


<style scoped>
.swiper {
    width: 100%;
    height: auto;
}

.swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
}

.carousel-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.thumbnail-container {
    position: relative;
    top: -40px;
    display: flex;
    justify-content: center;
    gap: 10px;
}

.thumbnail {
    width: 150px;
    height: 70px;
    cursor: pointer;
    border: 3px solid transparent;
    transition: border-color 0.3s ease;
}

.thumbnail img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.thumbnail.active {
    border-color: #ff1687;
}

/* Product Slider */
.product-slider {
    margin-top: 20px;
}

.product-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>
