<template>
    <div class="content-category row">
        <div class="content-left col-md-3">
            <div class="">
                <!-- Lọc theo hãng sản xuất -->
                <v-expansion-panels v-model="expandedPanels" multiple>
                    <!-- Bộ lọc theo hãng sản xuất -->
                    <v-expansion-panel value="brand">
                        <h3 class="fs-4 font-weight-bold text-center p-3">Bộ lọc sản phẩm</h3>
                        <v-expansion-panel-title class="font-weight-bold">
                            HÃNG SẢN XUẤT
                        </v-expansion-panel-title>
                        <v-expansion-panel-text>
                            <v-checkbox v-for="brand in brands" :key="brand.name" v-model="selectedBrands"
                                :label="`${brand.name} (${brand.count})`" :value="brand.name" hide-details
                                density="compact"></v-checkbox>
                        </v-expansion-panel-text>
                    </v-expansion-panel>

                    <!-- Bộ lọc theo khoảng giá -->
                    <v-expansion-panel value="price">
                        <v-expansion-panel-title class="font-weight-bold">
                            KHOẢNG GIÁ (VNĐ)
                        </v-expansion-panel-title>
                        <v-expansion-panel-text>
                            <v-checkbox v-for="price in priceRanges" :key="price.label" v-model="selectedPriceRanges"
                                :label="`${price.label} (${price.count})`" :value="price.label" hide-details
                                density="compact">
                            </v-checkbox>

                            <!-- Thanh trượt giá -->
                            <v-range-slider v-model="priceRange" :min="1000000" :max="100000000" :step="1000000"
                                class="mt-4" thumb-label="always"></v-range-slider>

                            <!-- Hiển thị giá đã chọn -->
                            <div class="d-flex justify-space-between mt-2">
                                <v-text-field v-model="priceRange[0]" density="compact" hide-details variant="outlined"
                                    class="text-center"></v-text-field>
                                <span class="mx-2"> - </span>
                                <v-text-field v-model="priceRange[1]" density="compact" hide-details variant="outlined"
                                    class="text-center"></v-text-field>
                            </div>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                </v-expansion-panels>
            </div>
        </div>

        <div class="content-right col-md-9">
            <div class="background-white">

                <div class="main-title d-flex justify-content-between align-items-center">
                    <h1 class="title">{{ categoryName }}</h1>
                    <div class="right-sort d-flex align-items-center fs-6 fw-semibold">
                        <div class="total-product ">{{ countProducts }} sản phẩm</div>
                        <div class="content-sort d-flex align-items-center ps-2">
                            <p class="mb-0" style="color: #8d94ac">Hiển thị theo: </p>
                            <select v-model="sortOption" class="sort-pro">
                                <option value="">Sắp xếp sản phẩm</option>
                                <option value="priceAsc">Giá tăng dần</option>
                                <option value="priceDesc">Giá giảm dần</option>
                            </select>

                        </div>
                    </div>
                </div>

                <div class="product-categoy-list mt-4">
                    <div class="swiper-container" v-if="products.length > 0">
                        <div class="mySwiper d-flex flex-wrap">
                            <div v-for="product in filteredAndSortedProducts" :key="product.productId">
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
                                                <div class="price-saleoff">-{{ product.sale }}%</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
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

<script>
import { ref, computed } from "vue";

export default {
    props: {
        products: {
            type: Array,
            required: true,
        },
        categoryName: {
            type: String,
            required: true,
        },
    },

    setup(props) {
        // Danh sách hãng sản xuất
        const brands = ref([{ name: "TNC Gaming", count: 139 }, { name: "Vivo", count: 25 }, { name: "Realme", count: 25 }, { name: "OnePlus", count: 25 }, { name: "Google", count: 25 }, { name: "BlackBerry", count: 25 }]);
        const selectedBrands = ref([]);
        const expandedPanels = ref(["brand", "price"]); // Mở cả hai panel mặc định

        const countProducts = computed(() => {
            return props.products.length;
        });

        // Danh sách khoảng giá
        const priceRanges = ref([
            { label: "Dưới 8 triệu", count: 5 },
            { label: "8 triệu - 11 triệu", count: 4 },
            { label: "11 triệu - 15 triệu", count: 9 },
            { label: "15 triệu - 20 triệu", count: 16 },
            { label: "20 triệu - 25 triệu", count: 9 },
            { label: "25 triệu - 30 triệu", count: 9 },
            { label: "30 triệu - 50 triệu", count: 32 },
            { label: "50 triệu - 70 triệu", count: 25 },
            { label: "70 triệu - 80 triệu", count: 9 },
            { label: "Trên 80 triệu", count: 25 },
        ]);
        const selectedPriceRanges = ref([]);

        // Thanh trượt giá
        const priceRange = ref([1000000, 1000000000]);

        // Giá trị sắp xếp sản phẩm
        const sortOption = ref("");

        // Lọc theo khoảng giá
        const filteredProducts = computed(() => {
            return props.products.filter((product) => {
                const price = Number(product.priceNew);
                const isInRange = price >= priceRange.value[0] && price <= priceRange.value[1];

                if (selectedPriceRanges.value.length > 0) {
                    return selectedPriceRanges.value.some((rangeLabel) => {
                        const range = priceRanges.value.find((p) => p.label === rangeLabel);
                        return range && price >= range.min && price <= range.max;
                    });
                }
                return isInRange;
            });
        });

        // Sắp xếp sản phẩm
        const sortedProducts = computed(() => {
            let sortedList = [...filteredProducts.value];

            if (sortOption.value === "priceAsc") {
                sortedList.sort((a, b) => a.priceNew - b.priceNew);
            } else if (sortOption.value === "priceDesc") {
                sortedList.sort((a, b) => b.priceNew - a.priceNew);
            }

            return sortedList;
        });

        return {
            brands,
            selectedBrands,
            priceRanges,
            selectedPriceRanges,
            priceRange,
            sortOption,
            filteredAndSortedProducts: sortedProducts,
            expandedPanels,
            countProducts,
        };
    }
};
</script>

<style>
/* Bóng nhẹ cho card */
.shadow-md {
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
}



/* Căn chỉnh văn bản trong ô nhập giá */
.text-center {
    text-align: center;
}

.content-right .title {
    font-size: 24px;
    font-weight: 700;
    text-transform: uppercase;
    border-bottom: 3px solid var(--blue, #3278f6);
    display: inline-block;
}

.main-title .total-product {
    color: #8d94ac;
    padding-right: 10px;
    border-right: 1px solid #8d94ac;
}

.content-sort select {
    padding: 5px 10px;
    border: 1px solid #ccc;
    outline: none;
    font-weight: 600;
}

.product-categoy-list .product-item {
    width: 247.8px;
}
</style>
