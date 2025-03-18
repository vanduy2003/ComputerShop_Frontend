<template>
    <section class="product">
        <div class="container">
            <!-- MÁY CHƠI GAME - CONSOLE NỔI BẬT -->
            <div class="group-category-home background-white mt-5">
                <div class="group-title d-flex align-items-center justify-content-between mb-3">
                    <h2 class="title-left">MÁY CHƠI GAME - CONSOLE NỔI BẬT</h2>
                    <router-link to="" class="more-all">
                        <span class="hover-txt position-relative">Xem tất cả</span>
                        <i class="mdi mdi-arrow-right"></i>
                    </router-link>
                </div>
                <div class="content-product-category d-flex">
                    <router-link to="" class="banner-sale-cate">
                        <img src="http://localhost:8080/images/1t.jpg" width="100%" height="100%" alt="PC Gaming" />
                    </router-link>
                    <div class="product-list">
                        <div class="swiper-container" v-if="filtereConsoleGameProducts.length > 0">
                            <swiper :slides-per-view="4" :loop="true" :navigation="true"
                                :pagination="{ clickable: true }" :modules="modules" class="mySwiper">
                                <swiper-slide v-for="product in filtereConsoleGameProducts" :key="product.productId">
                                    <div class="product-item">
                                        <router-link :to="`/products/${product.productId}`" class="product-image">
                                            <img :src="product.imageUrl" width="100%" height="100%"
                                                :alt="product.altText" />
                                            <span :class="[
                                                'box-sale',
                                                product.highlightType === 'Best Choice' ? 'hot' : 'bestsale',
                                            ]">
                                                {{ product.highlightType }}
                                            </span>
                                        </router-link>
                                        <div class="product-info">
                                            <router-link :to="`/products/${product.productId}`"
                                                class="product-name line-clamp-2">
                                                {{ product.name }}
                                            </router-link>
                                            <div class="info-review d-flex align-items-center">
                                                <i class="icon-star star5"></i>
                                                <span>{{ product.reviewCount }} đánh giá</span>
                                            </div>
                                            <div class="main-price">
                                                <del class="old-price">{{
                                                    Number(product.priceOld).toLocaleString('vi-VN') }}đ</del>
                                                <div class="d-flex align-items-center">
                                                    <b class="price">{{ Number(product.priceNew).toLocaleString('vi-VN')
                                                        }}đ</b>
                                                    <div class="price-saleoff">{{ product.sale }}%</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </swiper-slide>
                            </swiper>
                        </div>
                        <div v-else>
                            <h4 class="text-center">Dữ liệu đang được cập nhật... Bạn chờ
                                trong giây lát!!!</h4>
                        </div>
                    </div>
                </div>
            </div>
            <!-- GAMING GEARS NỔI BẬT -->
            <div class="group-category-home background-white mt-5">
                <div class="group-title d-flex align-items-center justify-content-between mb-3">
                    <h2 class="title-left">GAMING GEARS NỔI BẬT</h2>
                    <router-link to="" class="more-all">
                        <span class="hover-txt position-relative">Xem tất cả</span>
                        <i class="mdi mdi-arrow-right"></i>
                    </router-link>
                </div>
                <div class="content-product-category d-flex">
                    <router-link to="/" class="banner-sale-cate">
                        <img src="https://www.tncstore.vn/media/category/cat_big_78_1724323064.jpg" width="100%"
                            height="100%" alt="PC Gaming" />
                    </router-link>

                    <div class="product-list">
                        <div class="swiper-container" v-if="filteredGearsProducts.length > 0">
                            <swiper :slides-per-view="4" :loop="true" :navigation="true"
                                :pagination="{ clickable: true }" :modules="modules" class="mySwiper">
                                <swiper-slide v-for="product in filteredGearsProducts" :key="product.productId">
                                    <div class="product-item">
                                        <router-link :to="`/products/${product.productId}`" class="product-image">
                                            <img :src="product.imageUrl" width="100%" height="100%"
                                                :alt="product.altText" />
                                            <span :class="[
                                                'box-sale',
                                                product.highlightType === 'Best Choice' ? 'hot' : 'bestsale',
                                            ]">
                                                {{ product.highlightType }}
                                            </span>
                                        </router-link>
                                        <div class="product-info">
                                            <router-link :to="`/products/${product.productId}`"
                                                class="product-name line-clamp-2">
                                                {{ product.name }}
                                            </router-link>
                                            <div class="info-review d-flex align-items-center">
                                                <i class="icon-star star5"></i>
                                                <span>{{ product.reviewCount }} đánh giá</span>
                                            </div>
                                            <div class="main-price">
                                                <del class="old-price">{{
                                                    Number(product.priceOld).toLocaleString('vi-VN') }}đ</del>
                                                <div class="d-flex align-items-center">
                                                    <b class="price">{{ Number(product.priceNew).toLocaleString('vi-VN')
                                                    }}đ</b>
                                                    <div class="price-saleoff">{{ product.sale }}%</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </swiper-slide>
                            </swiper>
                        </div>
                        <div v-else>
                            <h4 class="text-center">Dữ liệu đang được cập nhật... Bạn chờ
                                trong giây lát!!!</h4>
                        </div>
                    </div>
                </div>
            </div>
            <!-- LAPTOP - MÁY TÍNH XÁCH TAY NỔI BẬT -->
            <div class="group-category-home background-white mt-5">
                <div class="group-title d-flex align-items-center justify-content-between mb-3">
                    <h2 class="title-left">LAPTOP - MÁY TÍNH XÁCH TAY NỔI BẬT</h2>
                    <router-link to="" class="more-all">
                        <span class="hover-txt position-relative">Xem tất cả</span>
                        <i class="mdi mdi-arrow-right"></i>
                    </router-link>
                </div>

                <div class="content-product-category d-flex">
                    <router-link to="" class="banner-sale-cate">
                        <img src="https://www.tncstore.vn/media/category/cat_big_79_1724323119.jpg" width="100%"
                            height="100%" alt="PC Gaming" />
                    </router-link>

                    <div class="product-list">
                        <div class="swiper-container" v-if="filteredLapProducts.length > 0">
                            <swiper :slides-per-view="4" :loop="true" :navigation="true"
                                :pagination="{ clickable: true }" :modules="modules" class="mySwiper">
                                <swiper-slide v-for="product in filteredLapProducts" :key="product.productId">
                                    <div class="product-item">
                                        <router-link :to="`/products/${product.productId}`" class="product-image">
                                            <img :src="product.imageUrl" width="100%" height="100%"
                                                :alt="product.altText" />
                                            <span :class="[
                                                'box-sale',
                                                product.highlightType === 'Best Choice' ? 'hot' : 'bestsale',
                                            ]">
                                                {{ product.highlightType }}
                                            </span>
                                        </router-link>
                                        <div class="product-info">
                                            <router-link :to="`/products/${product.productId}`"
                                                class="product-name line-clamp-2">
                                                {{ product.name }}
                                            </router-link>
                                            <div class="info-review d-flex align-items-center">
                                                <i class="icon-star star5"></i>
                                                <span>{{ product.reviewCount }} đánh giá</span>
                                            </div>
                                            <div class="main-price">
                                                <del class="old-price">{{
                                                    Number(product.priceOld).toLocaleString('vi-VN') }}đ</del>
                                                <div class="d-flex align-items-center">
                                                    <b class="price">{{ Number(product.priceNew).toLocaleString('vi-VN')
                                                    }}đ</b>
                                                    <div class="price-saleoff">{{ product.sale }}%</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </swiper-slide>
                            </swiper>
                        </div>
                        <div v-else>
                            <h4 class="text-center">Dữ liệu đang được cập nhật... Bạn chờ
                                trong giây lát!!!</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
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

    props: {
        products: {
            type: Array,
            required: true,
        },
    },

    setup() {
        return {
            modules: [Autoplay, Navigation, Pagination], // ✅ Khai báo modules trong setup()
        };
    },

    computed: {
        filtereConsoleGameProducts() {
            return this.products.filter((product) => product.categoryId === 4);
        },

        filteredGearsProducts() {
            console.log(this.filteredLapProducts);
            return this.products.filter((product) => product.categoryId === 3);
        },
        filteredLapProducts() {
            return this.products.filter((product) => product.categoryId === 7);
        },
    },
};
</script>
