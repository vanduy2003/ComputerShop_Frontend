<template>
    <section class="product">
        <div class="container">
            <!-- PC GAMING NỔI BẬT -->
            <div class="group-category-home background-white mt-5">
                <div class="group-title d-flex align-items-center justify-content-between mb-3">
                    <h2 class="title-left">PC Gaming nổi bật</h2>
                    <router-link to="" class="more-all">
                        <span class="hover-txt position-relative">Xem tất cả</span>
                        <i class="mdi mdi-arrow-right"></i>
                    </router-link>
                </div>
                <div class="content-product-category d-flex">
                    <router-link to="" class="banner-sale-cate">
                        <img src="https://www.tncstore.vn/media/category/cat_big_82_1724323025.jpg" width="100%"
                            height="100%" alt="PC Gaming" />
                    </router-link>

                    <div class="product-list">
                        <div class="swiper-container"
                            v-if="filteredPcGameProducts && filteredPcGameProducts.length > 0">
                            <swiper :slides-per-view="4" :loop="true" :navigation="true"
                                :pagination="{ clickable: true }" :modules="modules" class="mySwiper">
                                <swiper-slide v-for="product in filteredPcGameProducts" :key="product.productId">
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
                                                    <span class="box-favarite mdi mdi-heart-circle"></span>
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
            <!-- PC VĂN PHÒNG NỔI BẬT -->
            <div class="group-category-home background-white mt-5">
                <div class="group-title d-flex align-items-center justify-content-between mb-3">
                    <h2 class="title-left">PC Đồ Họa - Thiết Kế - Edit video nổi bật</h2>
                    <router-link to="" class="more-all">
                        <span class="hover-txt position-relative">Xem tất cả</span>
                        <i class="mdi mdi-arrow-right"></i>
                    </router-link>
                </div>
                <div class="content-product-category d-flex">
                    <router-link to="/" class="banner-sale-cate">
                        <img src="https://www.tncstore.vn/media/category/cat_big_210_1724323045.jpg" width="100%"
                            height="100%" alt="PC Gaming" />
                    </router-link>

                    <div class="product-list ">
                        <div class="swiper-container" v-if="filteredPcOfficeProducts.length > 0">
                            <swiper :slides-per-view="4" :loop="true" :navigation="true"
                                :pagination="{ clickable: true }" :modules="modules" class="mySwiper">
                                <swiper-slide v-for="product in filteredPcOfficeProducts" :key="product.productId">
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
                                                    <b class="price">{{
                                                        Number(product.priceNew).toLocaleString('vi-VN')
                                                    }}đ</b>
                                                    <div class="price-saleoff">{{ product.sale }}%</div>
                                                    <span class="box-favarite mdi mdi-heart-circle"></span>
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
            <!-- MÀN HÌNH MÁY TÍNH NỔI BẬT -->
            <div class="group-category-home background-white mt-5">
                <div class="group-title d-flex align-items-center justify-content-between mb-3">
                    <h2 class="title-left">MÀN HÌNH MÁY TÍNH NỔI BẬT</h2>
                    <router-link to="" class="more-all">
                        <span class="hover-txt position-relative">Xem tất cả</span>
                        <i class="mdi mdi-arrow-right"></i>
                    </router-link>
                </div>

                <div class="content-product-category d-flex">
                    <router-link to="" class="banner-sale-cate">
                        <img src="./images/1e.jpg" width="100%" height="100%" alt="PC Gaming" />
                    </router-link>

                    <div class="product-list ">
                        <div class="swiper-container" v-if="filteredMonitorProducts.length > 0">
                            <swiper :slides-per-view="4" :loop="true" :navigation="true"
                                :pagination="{ clickable: true }" :modules="modules" class="mySwiper">
                                <swiper-slide v-for="product in filteredMonitorProducts" :key="product.productId">
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
                                                    <b class="price">{{
                                                        Number(product.priceNew).toLocaleString('vi-VN')
                                                    }}đ</b>
                                                    <div class="price-saleoff">{{ product.sale }}%</div>
                                                    <span class="box-favarite mdi mdi-heart-circle"></span>
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

    setup() {
        return {
            modules: [Autoplay, Navigation, Pagination], // ✅ Khai báo modules trong setup()
        };
    },

    props: {
        products: {
            type: Array,
            required: true,
        },
    },


    computed: {
        filteredPcGameProducts() {
            return this.products.filter((product) => product.categoryId === 1);
        },
        filteredPcOfficeProducts() {
            return this.products.filter((product) => product.categoryId === 8);
        },
        filteredMonitorProducts() {
            return this.products.filter((product) => product.categoryId === 2);
        },
    },
};
</script>

<style>
.group-category-home .title-left {
    font-size: 24px;
    font-weight: 700;
    text-transform: uppercase;
    border-bottom: 3px solid #3278f6;
    display: inline-block;
    padding-bottom: 3px;
}

.more-all {
    font-size: 14px;
    color: #3278f6;
    font-weight: 600;
}

.more-all .hover-txt::before {
    background: #3278f6;
    position: absolute;
    content: "";
    width: 0;
    height: 1px;
    bottom: -1px;
    left: 0;
    transition: 0.5s;
}

.hover-txt:hover::before {
    width: 100%;
    transition: 0.5s;
}

.more-all i {
    margin-left: 5px;
    font-size: 16px;
}

.content-product-category .banner-sale-cate {
    width: 258px;
    height: 373px;
    display: block;
}

.content-product-category .banner-sale-cate img {
    max-width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
}

.content-product-category .product-list {
    width: calc(100% - 224px);
    position: relative;
}

.owl-carousel .owl-item {
    width: 255px;
    min-height: 1px;
    float: left;
}

.product-item {
    border: 2px solid #ededed;
    overflow: hidden;
    position: relative;
}

.product-item:hover {
    border: 2px solid #0a88ff;
}

.product-item .product-image {
    display: block;
    position: relative;
    height: 205px;
    width: 100%;
    overflow: hidden;
    margin-bottom: 10px;
}

.product-item .product-image img {
    object-fit: contain;
}

.product-item .product-image .box-sale.bestsale {
    background: #f28902;
}

.product-item .product-image .box-sale.hot {
    background: #8fff00;
}

.product-item .product-image .box-sale {
    position: absolute;
    left: 0;
    top: 0;
    padding: 4px 8px;
    font-size: 12px;
    font-weight: 600;
    color: #000;
}

.product-item .box-favarite {
    position: absolute;
    right: 0;
    padding: 4px 8px;
    font-size: 40px;
    font-weight: 600;
    color: #ff1c1c;
    cursor: pointer;
    opacity: 0.7;
    transition: 0.4s;
}

.product-item .box-favarite:hover {
    color: #fb4e4e;
    transform: scale(1.2);
    opacity: 1;
}



a {
    text-decoration: none;
    color: #29324e;
}

.product-item .product-info {
    border-top: 2px solid #ededed;
    padding: 12px;
}

.product-item .product-name {
    display: inline-block;
    font-weight: 600;
    word-break: break-all;
    height: 40px;
    margin-bottom: 5px;
    position: relative;
    z-index: 9;
}

.icon-star {
    background: url(https://www.tncstore.vn/static/assets/default/images/icon_star.png?v=1) no-repeat;
    display: block;
    background-size: 60px 75px;
}

.icon-star.star5 {
    width: 60px;
    height: 12px;
    background-position: 0 0;
}

.icon-star.star4 {
    width: 60px;
    height: 12px;
    background-position: 0 -12px;
}

.icon-star.star3 {
    width: 60px;
    height: 12px;
    background-position: 0 -24px;
}

.icon-star.star2 {
    width: 60px;
    height: 12px;
    background-position: 0 -37px;
}

.icon-star.star1 {
    width: 60px;
    height: 12px;
    background-position: 0 -50px;
}

.product-item .info-review span {
    font-size: 13px;
    color: #8d94ac;
    margin: 3px 0 0 8px;
}

.product-item .old-price {
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
    color: #8d94ac;
    margin-top: 8px;
    display: block;
}

.product-item .price {
    color: #fb4e4e;
    font-size: 20px;
    font-weight: 700;
    line-height: 28px;
}

.product-item .price-saleoff {
    border: 2px solid #fb4e4e;
    width: 38px;
    height: 20px;
    line-height: 18px;
    text-align: center;
    margin-left: 20px;
    color: #fb4e4e;
    font-size: 12px;
    font-weight: 600;
}

.product-item .boder-top,
.product-item .boder-right,
.product-item .boder-bottom,
.product-item .boder-left {
    position: absolute;
    content: "";
    width: 100%;
    height: 4px;
    background: #3278f6;
    display: none;
    transition: 0.4s;
}

.product-item .boder-top {
    left: 0;
    top: 0;
}

.product-item .boder-right {
    width: 4px;
    height: 100%;
    right: 0;
    top: 0;
}

.product-item .boder-bottom {
    left: 0;
    bottom: 0;
}

.product-item .boder-left {
    width: 4px;
    height: 100%;
    left: 0;
    bottom: 0;
}

.product-item:hover .boder-top,
.product-item:hover .boder-right,
.product-item:hover .boder-bottom,
.product-item:hover .boder-left {
    display: block;
}

.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.product-item .product-name:hover {
    color: #fb4e4e;
}
</style>
