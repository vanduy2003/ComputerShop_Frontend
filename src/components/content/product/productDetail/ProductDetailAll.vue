<template>
    <div>
        <ProductDetail :product="product" :selectedImage="selectedImage" :suggestedProducts="suggestedProducts"
            :components="components" @update:selectedImage="selectedImage = $event" />
        <ProductDescription :components="components" :product="product" />
        <div class="form-product mt-5">
            <div class="container">

                <!-- GỢI Ý CÙNG DANH MỤC -->
                <div class="product-collection my-4">
                    <div class="list-tab-collection d-flex align-items-center">
                        <p class="heading">Gợi ý sản phẩm liên quan</p>
                    </div>
                    <div class="background-white">
                        <div class="content-product-category d-flex">
                            <div class="product-list">
                                <div class="swiper-container">
                                    <swiper :slides-per-view="5" :loop="true" :navigation="true"
                                        :pagination="{ clickable: true }" :modules="modules" class="mySwiper">
                                        <swiper-slide v-for="item in suggestedProducts" :key="item.productId">
                                            <div class="product-item">
                                                <router-link :to="`/products/${item.productId}`" class="product-image">
                                                    <img :src="item.imageUrl" width="100%" height="100%"
                                                        :alt="product.altText" />
                                                    <span :class="[
                                                        'box-sale',
                                                        item.highlightType === 'Best Choice' ? 'hot' : 'bestsale',
                                                    ]">
                                                        {{ item.highlightType }}
                                                    </span>
                                                </router-link>
                                                <div class="product-info">
                                                    <router-link :to="`/products/${item.productId}`"
                                                        class="product-name line-clamp-2">
                                                        {{ item.name }}
                                                    </router-link>
                                                    <div class="info-review d-flex align-items-center">
                                                        <i class="icon-star star5"></i>
                                                        <span>{{ item.reviewCount }} đánh giá</span>
                                                    </div>
                                                    <div class="main-price">
                                                        <del class="old-price">{{
                                                            Number(item.priceOld).toLocaleString("vi-VN") }}đ</del>
                                                        <div class="d-flex align-items-center">
                                                            <b class="price">{{
                                                                Number(item.priceNew).toLocaleString("vi-VN") }}đ</b>
                                                            <div class="price-saleoff">{{ item.sale }}%</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </swiper-slide>
                                    </swiper>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useProductStore } from "@/stores/productStore";
import { storeToRefs } from "pinia";
import { onMounted, watch, computed } from "vue";
import ProductDetail from "./ProductDetail.vue";
import ProductDescription from "./ProductDescription.vue";
import { useRoute } from "vue-router";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay"; // ✅ Đảm bảo import CSS autoplay
import { Autoplay, Navigation, Pagination } from "swiper/modules";

export default {
    components: {
        ProductDetail,
        ProductDescription,
        Swiper,
        SwiperSlide,
    },

    setup() {
        const store = useProductStore();
        const { products, product, selectedImage, components } = storeToRefs(store);
        const route = useRoute();

        const fetchProductDataID = async (productId) => {
            await store.fetchProductDataID(productId);
        };

        onMounted(() => {
            const productId = route.params.id;
            store.fetchProductDataID(productId);
            store.fetchProducts();
        });

        watch(() => route.params.id, (newId) => {
            if (newId) fetchProductDataID(newId);
        });

        // ✅ Gợi ý theo danh mục
        const suggestedProducts = computed(() => {
            if (!product.value || !products.value.length) return [];
            return products.value.filter(
                (p) =>
                    p.categoryId === product.value.categoryId &&
                    p.productId !== product.value.productId
            ).slice(0, 10); // Giới hạn số lượng hiển thị
        });

        return {
            product,
            selectedImage,

            components,
            products,
            suggestedProducts, // ⬅ thêm dòng này
            modules: [Autoplay, Navigation, Pagination], // ✅ Đảm bảo thêm modules vào đây
        };
    }
};
</script>
