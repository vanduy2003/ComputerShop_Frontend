<template>
    <div class="tops-product container">
        <div class="group-category-home background-white mt-5">
            <div class="group-title d-flex align-items-center justify-content-between mb-3">
                <h2 class="title-left">Top Các Sản Phẩm Bán Chạy Nhất🔥</h2>
                <router-link to="" class="more-all">
                    <span class="hover-txt position-relative">Xem tất cả</span>
                    <i class="mdi mdi-arrow-right"></i>
                </router-link>
            </div>
            <div class="content-product-category form-product">
                <div class="product-list">
                    <div class="swiper-container" v-if="topSellingProducts.length > 0">
                        <swiper :slides-per-view="5" :loop="true" :navigation="true" :pagination="{ clickable: true }"
                            :modules="modules" class="mySwiper">
                            <swiper-slide v-for="(product, index) in topSellingProducts" :key="product.productId">
                                <div class="product-item position-relative">
                                    <!-- Huy hiệu TOP -->
                                    <div class="badge-top position-absolute text-white px-2 py-1 fw-bold"
                                        :class="'top-' + (index + 1)">
                                        🏆 TOP {{ index + 1 }}
                                    </div>
                                    <router-link :to="`/products/${product.productId}`" class="product-image">
                                        <img :src="product.productImage" width="100%" height="100%"
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
                                            {{ product.productName }}
                                        </router-link>
                                        <div class="info-review d-flex align-items-center">
                                            <i class="icon-star star5"></i>
                                            <span>{{ product.reviewCount }} đánh giá</span>
                                        </div>
                                        <div class="main-price">
                                            <del class="old-price">{{
                                                Number(product.priceOld).toLocaleString('vi-VN') }}₫</del>
                                            <div class="d-flex align-items-center">
                                                <b class="price">{{ Number(product.priceNew).toLocaleString('vi-VN')
                                                }}₫</b>
                                                <div class="price-saleoff">-{{ product.sale }}%</div>

                                                <!-- <span @click="addFavorite(product.productId)" :class="[
                                                    'mdi',
                                                    favoriteProductIds.includes(product.productId)
                                                        ? 'mdi-heart text-danger'
                                                        : 'mdi-heart-outline',
                                                    'box-favarite',
                                                ]" style="font-size: 24px; cursor: pointer;"></span> -->
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
</template>

<script setup>
import { useProductStore } from '@/stores/productStore';
import { onMounted, computed } from 'vue';
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";  // ✅ Đảm bảo import CSS autoplay
import { Autoplay, Navigation, Pagination } from "swiper/modules";


const modules = [Autoplay, Navigation, Pagination];

const productStore = useProductStore();
const { fetchTopSellingProducts } = productStore;

const topSellingProducts = computed(() => productStore.topSellingProducts);

onMounted(async () => {
    await fetchTopSellingProducts();
});

</script>

<style>
.badge-top {
    right: 0;
    background-color: #ff4d3a;
    /* đỏ nổi bật */
    z-index: 10;
}

.top-1 {
    background-color: #e74c3c;
}

/* đỏ cho top 1 */
.top-2 {
    background-color: #f39c12;
}

/* cam cho top 2 */
.top-3 {
    background-color: #3498db;
}

/* xanh cho top 3 */

.top-4 {
    background-color: #2ecc71;
}

/* xanh lá cho top 4 */

.top-5 {
    background-color: #9b59b6;
}

/* tím cho top 5 */

.top-6 {
    background-color: #e67e22;
}

/* cam sáng cho top 6 */

.top-7 {
    background-color: #1abc9c;
}

/* xanh ngọc cho top 7 */


.top-8 {
    background-color: #34495e;
}

/* xanh đen cho top 8 */

.top-9 {
    background-color: #8e44ad;
}

/* tím đậm cho top 9 */

.top-10 {
    background-color: #c0392b;
}
</style>