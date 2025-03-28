<template>
    <div class="form-product">
        <div class="container">

            <div class="product-collection">
                <div class="list-tab-collection d-flex align-items-center">
                    <p class="heading">
                        Sản Phẩm Bán Chạy
                    </p>
                </div>
                <div class="background-white">
                    <div class="content-product-category d-flex">
                        <div class="product-list">
                            <div class="swiper-container" v-if="hotProducts.length > 0">
                                <swiper :slides-per-view="5" :loop="true" :navigation="true"
                                    :pagination="{ clickable: true }" :modules="modules" class="mySwiper">
                                    <swiper-slide v-for="product in hotProducts" :key="product.productId">
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
                                                <router-link :to="'/api/v1/data/products/' + product.productId"
                                                    class="product-name line-clamp-2">
                                                    {{ product.name }}
                                                </router-link>
                                                <div class="info-review d-flex align-items-center">
                                                    <i class="icon-star star5"></i>
                                                    <span>{{ product.reviewCount }} đánh giá</span>
                                                </div>
                                                <div class="main-price">
                                                    <del class="old-price">{{
                                                        Number(product.priceOld).toLocaleString("vi-VN") }}đ</del>
                                                    <div class="d-flex align-items-center">
                                                        <b class="price">{{
                                                            Number(product.priceNew).toLocaleString("vi-VN") }}đ</b>
                                                        <div class="price-saleoff">{{ product.sale }}%</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </swiper-slide>
                                </swiper>
                            </div>
                            <div v-else>
                                <h4 class="text-center">
                                    Dữ liệu đang được cập nhật... Bạn chờ trong giây lát!!!
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay"; // ✅ Đảm bảo import CSS autoplay
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { computed } from "vue";

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

    setup(props) {

        const hotProducts = computed(() =>
            props.products.filter((product) => product.highlightType === "Best Choice")
        );

        return {
            modules: [Autoplay, Navigation, Pagination], hotProducts,
        };
    },



};
</script>

<style scoped>
.form-product .heading {
    line-height: 48px;
    padding: 0 24px;
    font-size: 16px;
    font-weight: 600;
    text-align: center;
    color: #fff;
    background: skyblue;
    margin-bottom: 0;
}

.form-product .product-list {
    width: 100%;
}

.list-tab-collection {
    height: 48px;
    background: #29324e;
}
</style>
