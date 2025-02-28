<template>
    <div class="content-category row">
        <div class="content-left col-md-3">
            <div class="background-white">
                <h2 class="title">Bộ lọc sản phẩm</h2>
                <div class="box-filter">
                    <div class="item-filter"></div>
                    <div class="item-filter"></div>
                    <div class="item-filter"></div>
                    <div class="item-filter"></div>
                </div>
            </div>
        </div>

        <div class="content-right col-md-9">
            <div class="background-white">

                <div class="main-title d-flex justify-content-between align-items-center">
                    <h1 class="title">Laptop Gaming</h1>
                    <div class="right-sort d-flex align-items-center">
                        <div class="total-product">295 sản phẩm</div>
                        <div class="content-sort d-flex align-items-center ps-2">
                            <p class="mb-0" style="color: #8d94ac">Hiển thị theo: </p>
                            <select class="sort-pro">
                                <option value="/gaming-laptop.html">Sắp xếp sản phẩm</option>
                                <option value="">
                                    Mới nhất
                                </option>
                                <option value="">
                                    Giá tăng dần
                                </option>
                                <option value="">
                                    Giá giảm dần
                                </option>
                                <option value="">
                                    Đánh giá
                                </option>
                                <option value="">
                                    Tên A --> Z
                                </option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="product-categoy-list mt-4">
                    <div class="swiper-container" v-if="products.length > 0">
                        <div class="mySwiper d-flex flex-wrap">
                            <div v-for="product in products" :key="product.productId">
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
                                                Number(product.priceOld).toLocaleString('vi-VN') }}đ</del>
                                            <div class="d-flex align-items-center">
                                                <b class="price">{{ Number(product.priceNew).toLocaleString('vi-VN')
                                                    }}đ</b>
                                                <div class="price-saleoff">{{ product.sale }}%</div>
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

export default {
    props: {
        products: {
            type: Array,
            required: true,
        },
    },




};
</script>

<style>
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
