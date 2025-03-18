<template>
    <div class="product-detail">
        <div class="container">
            <!-- breadcrumb -->
            <div id="breadcrumb" class="breadcrumb">
                <ol class="w-100 float-start p-0 m-0 bg-transparent">
                    <li class="home float-start list-unstyled">
                        <a href="/" class="text-custom">
                            <span itemprop="name"><i class="mdi mdi-home"></i> TRANG CHỦ</span>
                        </a>
                        <i class="mdi mdi-chevron-right"></i>
                    </li>

                    <li class="home float-start list-unstyled">
                        <a href="/gaming-pc.html" class="text-custom">
                            <span itemprop="name">
                                {{ product.categoryName }}
                            </span>
                            <i class="mdi mdi-chevron-right"></i>
                        </a>
                    </li>

                    <li class="home float-start list-unstyled">
                        <a href="/gaming-pc.html" class="text-custom">
                            <span itemprop="name">
                                {{ product.categoryName }}
                            </span>
                        </a>
                    </li>
                </ol>
            </div>
            <!-- main-product-detail -->
            <div class="main-product-detail background-white">
                <div class="content-main-product row">
                    <!-- product-images-detail -->
                    <div class="product-images-detail col-md-3" v-if="product">
                        <div id="sync1" class="image-big w-100">
                            <a href="#">
                                <img :src="selectedImage" alt="PC Core Ultra 5 - Nova 4060 Ti" width="300px"
                                    class="img-fluid" v-if="selectedImage" @click="openModal" />
                            </a>
                        </div>

                        <div id="sync2" class="image-thumb d-flex flex-wrap mt-3"
                            v-if="product.imageDetail && product.imageDetail.length">
                            <a v-for="(image, index) in product.imageDetail" :key="index" href="#" class="item"
                                :class="{ active: selectedImage === image }"
                                @click.prevent="$emit('update:selectedImage', image)">
                                <img :src="image" alt="PC Core Ultra 5 - Nova 4060 Ti" />
                            </a>
                        </div>
                    </div>

                    <!-- Modal hiển thị ảnh -->
                    <v-dialog v-model="isModalOpen" max-width="800px" persistent>
                        <v-card @click.stop>
                            <v-card-title class="headline">Hình ảnh sản phẩm</v-card-title>
                            <v-card-text>
                                <v-carousel v-model="currentImageIndex" hide-delimiters>
                                    <v-carousel-item v-for="(img, index) in product?.imageDetail" :key="index"
                                        :src="img"></v-carousel-item>
                                </v-carousel>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="primary" @click="closeModal">Đóng</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>

                    <!-- product-main-detail -->
                    <div class="product-main-detail col-md-5">
                        <div class="list-brand d-flex flex-wrap align-items-center">
                            <a href="/brand/tnc-gaming" class="item">
                                <img :src="product.brandImg" alt="TNC Gaming" width="100%" />
                            </a>
                        </div>

                        <h1 class="name fs-4 fw-bold mb-2 mt-3">
                            {{ product.name }}
                        </h1>
                        <div class="info-sku d-flex align-items-center">
                            <span class="sku pe-2">MSP: SP00{{ product.productId }}VKL</span>
                            <div class="review d-flex align-items-center" id="js-scroll-review">
                                Đánh giá: <i class="icon-star star5 ms-1"></i>
                            </div>
                            <span class="view ms-2">Lượt xem: 11362</span>
                        </div>

                        <!-- Thông tin linh kiện -->
                        <div class="summary-info my-4 fs-6">
                            <v-list dense>
                                <v-list-item v-for="component in showMore ? components : components.slice(0, 5)"
                                    :key="component.componentId" class="component-item p-0 mb-2">
                                    <v-list-item-content>
                                        <v-list-item-title>
                                            <strong>{{ component.componentType }}: </strong>
                                            <a href="#" target="_blank">
                                                {{ component.component_name }}
                                            </a>
                                        </v-list-item-title>
                                        <v-list-item-subtitle>
                                            {{ component.specifications }} - Số lượng: {{ component.quantity }}
                                        </v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>

                            <button class="btn_show_summary" @click="toggleShowMore">
                                {{ showMore ? "Thu gọn" : "Xem thêm" }}
                            </button>
                        </div>

                        <div class="product-config-group">
                            <div class="fw-semibold text-uppercase d-block mb-2" style="color: #8d94ac">
                                Tùy chọn sản phẩm
                            </div>
                            <div class="content-option d-flex flex-wrap">
                                <a href="/pc-core-ultra-5-supernova-4060ti-super.html" class="item-option">
                                    <span class="name line-clamp-2">PC Core Ultra 5 - Supernova 4060Ti Super</span>

                                    <div class="main-price-config d-flex align-items-center">
                                        <span class="price-config">36.790.000 đ</span>
                                    </div>
                                </a>

                                <a href="/pc-core-ultra-5-nova-4060-ti.html" class="item-option selected">
                                    <span class="name line-clamp-2">PC Core Ultra 5 - Nova 4060 Ti</span>

                                    <div class="main-price-config d-flex align-items-center">
                                        <span class="price-config">38.090.000 đ</span>
                                    </div>
                                </a>
                            </div>
                        </div>

                        <!----end product-config-group --->
                    </div>
                    <!-- product-main-right -->
                    <div class="product-main-right col-md-4">
                        <div class="info-specialOffer">
                            <div class="text-white fw-semibold px-3 py-2"
                                style="background-color: #fb4e4e; font-size: 14px">
                                <i class="mdi mdi-gift me-1"></i>
                                Khuyến mãi khi mua sản phẩm
                            </div>
                            <div class="content">
                                <p>
                                    <span style="font-size: 12pt"><strong>Gói quà tặng bao gồm:</strong></span>
                                </p>
                                <p>
                                    <span style="font-size: 12pt">- Phiếu giảm giá trị giá 1.800.000 Đồng (Đã được trừ
                                        thẳng vào
                                        giá)</span>
                                </p>
                                <p>
                                    <span style="font-size: 12pt">-<strong>&nbsp;</strong>Tặng
                                        01<strong>&nbsp;</strong>Bàn di chuột
                                        TNC</span>
                                </p>
                                <p>
                                    <span style="font-size: 12pt">- Giảm đến 500k&nbsp;khi mua kèm màn hình LG đến hết
                                        31/12/2024. Xem
                                        chi tiết các mã được áp dụng&nbsp;<span style="color: #ff9900"><strong><a
                                                    style="color: #ff9900"
                                                    href="https://www.tncstore.vn/mua-pc-giam-gia-man-hinh-lg.html"
                                                    target="_blank">TẠI ĐÂY</a></strong></span></span>
                                </p>
                                <p>
                                    <span style="font-size: 12pt">- Tặng Voucher 5% tối đa 500k áp dụng cho KH mua
                                        Gear</span>
                                </p>
                                <p>
                                    <span style="font-size: 12pt">- Hỗ trợ trả góp với lãi suất 0%&nbsp;</span>
                                </p>
                                <p>
                                    <span style="font-size: 12pt">- Tặng Voucher 5% tối đa 150K áp dụng cho KH mua màn
                                        hình</span>
                                </p>
                            </div>
                        </div>
                        <!-- end khuyen mai -->

                        <div class="info-main-price py-3 border-bottom">
                            <div class="row d-flex align-items-center">
                                <div class="price col-xl-5">
                                    {{ Number(product.priceNew).toLocaleString("vi-VN") }}đ
                                </div>

                                <del class="old-price col-xl-5">
                                    {{ Number(product.priceOld).toLocaleString("vi-VN") }}đ
                                </del>

                                <div class="saleoff col-xl-1 text-center">-15%</div>
                            </div>

                            <div class="info-vat d-flex align-items-center">
                                <div class="item">Bảo hành theo linh kiện</div>
                            </div>
                        </div>
                        <!-- end price -->

                        <div class="group-add-product py-3 border-bottom">
                            <div class="choose-quantity d-flex align-items-center">
                                <span>Số lượng</span>
                                <div class="unit-detail-amount-control d-flex">
                                    <a @click="decreaseQuantity"><i class="mdi mdi-minus"></i></a>
                                    <input type="text" size="3" :value="quantity" />
                                    <a @click="increaseQuantity"><i class="mdi mdi-plus"></i></a>
                                </div>
                            </div>
                            <div class="all-btn-add-product d-flex align-items-center justify-content-between mt-3">
                                <div class="btn-buy">
                                    <button @click="addToCart(product.id)">Thêm vào giỏ hàng</button>
                                </div>
                                <div class="btn-buy buyNow">
                                    <button @click="buyToCart(product.id)">Mua ngay</button>
                                </div>
                            </div>
                        </div>
                        <!-- end group add product -->

                        <div class="info-policy py-3 fs-6">
                            <div class="item">
                                <i class="mdi mdi-credit-card"></i>
                                <span>Hỗ trợ trả góp 0%, trả trước 0 đ</span>
                            </div>
                            <div class="item">
                                <i class="mdi mdi-cash"></i>
                                <span>Hoàn tiền 200% nếu có hàng giả</span>
                            </div>
                            <div class="item">
                                <i class="mdi mdi-lightning-bolt-outline"></i>
                                <span>Giao hàng nhanh trên toàn quốc</span>
                            </div>
                            <div class="item">
                                <i class="mdi mdi-headset"></i>
                                <span>Hỗ trợ kĩ thuật online 24/7</span>
                            </div>
                            <div class="item">
                                <i class="mdi mdi-tools"></i>
                                <span>Vệ sinh miễn phí PC, Laptop trọn đời</span>
                            </div>
                        </div>
                        <!-- end info policy -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { onMounted, onUnmounted, ref } from "vue";
import { useCartStore } from "@/stores/cartStore";




export default {
    props: {
        product: Object,
        selectedImage: String,
        loading: Boolean,
        error: String,
        components: Array,
    },

    setup(props) {
        // State quản lý modal và danh sách linh kiện
        const isModalOpen = ref(false);
        const currentImageIndex = ref(0);
        const showMore = ref(false);
        const cartStore = useCartStore();
        const quantity = ref(1);


        // Xử lý sự kiện đóng modal khi nhấn phím ESC
        const handleEscape = (event) => {
            if (event.key === "Escape") {
                isModalOpen.value = false;
            }
        };

        // Xử lý sự kiện tăng giảm số lượng sản phẩm
        const increaseQuantity = () => {
            quantity.value++;
        };

        // Giảm số lượng sản phẩm
        const decreaseQuantity = () => {
            if (quantity.value > 1) {
                quantity.value--;
            }
        }

        // Thêm sản phẩm vào giỏ hàng
        const addToCart = () => {
            const productId = props.product.productId;
            cartStore.addToCart(productId, quantity.value);
        }

        // Mua ngay
        const buyToCart = () => {
            const productId = props.product.productId;
            cartStore.buyToCart(productId, quantity.value);
        }

        // Lắng nghe sự kiện bàn phím
        onMounted(() => document.addEventListener("keydown", handleEscape));
        onUnmounted(() => document.removeEventListener("keydown", handleEscape));

        return {
            isModalOpen,
            currentImageIndex,
            showMore,
            quantity,

            // Methods
            openModal: () => (isModalOpen.value = true),
            closeModal: () => (isModalOpen.value = false),
            toggleShowMore: () => (showMore.value = !showMore.value),
            addToCart,
            increaseQuantity,
            decreaseQuantity,
            buyToCart,
        };
    }
}

</script>

<style>
.btn_show_summary {
    border: 1px solid var(--color-global);
    padding: 6px 12px;
    font-weight: bold;
    color: var(--color-global);
}

.btn_show_summary:hover {
    background: var(--color-global);
    color: #fff;
}

.v-list-item-subtitle {
    line-height: normal;
    font-size: 16px;
}

.v-list {
    list-style-type: disc !important;
    /* Hiển thị dấu chấm tròn */
    padding-left: 20px;
    /* Thụt lề để hiển thị đẹp hơn */
}

.component-item {
    display: list-item !important;
    /* Giữ dấu chấm trong danh sách */
}

.info-policy .item {
    display: flex;
    align-items: center;
}

.info-policy i {
    font-size: 22px;
    margin-right: 5px;
    color: #29324e;
}

.product-detail .btn-buy.buyNow {
    margin-right: 0;
    background: #fff;
    border: 1px solid var(--color-global);
}

.product-detail .btn-buy.buyNow button {
    color: var(--color-global);
}

.product-detail .btn-buy.buyNow:hover {
    background: var(--color-global);
}

.product-detail .btn-buy.buyNow:hover button {
    color: #fff;
}

.btn-buy button {
    text-transform: capitalize;
    line-height: 50px;
    font-size: 16px;
    font-weight: 600;
    color: #fff;
}

.product-detail .btn-buy {
    width: calc(100% / 2 - 10px);
    text-align: center;
    background: var(--color-global);
    height: 50px;
}

.product-detail .btn-buy:hover {
    background: #fff;
    border: 1px solid var(--color-global);
}

.product-detail .btn-buy:hover button {
    color: var(--color-global);
}

.text-custom {
    color: #29324e;
}

.breadcrumb li:first-child span,
.breadcrumb li:first-child i {
    color: #8d94ac;
}

.breadcrumb ol li a span {
    font-size: 14px;
    line-height: 80px;
    float: left;
    display: flex;
    align-items: center;
    color: #000;
    font-weight: 600;
}

.breadcrumb ol li i {
    margin-left: 5px;
    margin-right: 5px;
    float: left;
    line-height: 80px;
    font-size: 18px;
}

.summary-info li p {
    margin-bottom: 0 !important;
}

.info-specialOffer .content p {
    margin-bottom: 0 !important;
}

.product-detail .image-thumb .item {
    width: calc(100% / 3 - 8px);
    height: 75px;
    margin-right: 8px;
    margin-bottom: 8px;
}

.product-detail .image-thumb .item img {
    display: block;
    height: 100%;
    width: 100%;
    object-fit: cover;
}

.list-brand .item {
    margin: 10px 0;
    width: 130px;
}

.product-detail .product-main-detail .info-sku {
    padding-bottom: 16px;
    border-bottom: 1px solid #c1c1c1;
    color: #8d94ac;
    font-weight: 600;
}

.product-main-detail .info-sku .review {
    padding: 0 10px;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
}

.summary-info li {
    line-height: 22px;
}

.product-config-group .item-option {
    width: calc(50% - 8px);
    margin-right: 8px;
    margin-bottom: 8px;
    border: 1px solid #ccc;
    padding: 8px 16px;
}

.product-config-group .item-option:hover {
    border: 2px solid #3278f6;
}

.product-config-group .name {
    font-weight: 600;
    font-size: 16px;
    color: #29324e;
    margin-bottom: 5px;
}

.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.price-config {
    color: #fb4e4e;
    font-weight: 600;
}

.info-specialOffer .content {
    padding: 12px;
    border: 1px solid #fb4e4e;
}

.info-main-price .price {
    font-size: 28px;
    font-weight: 700;
    color: #fb4e4e;
}

.info-main-price .old-price {
    font-size: 18px;
    font-weight: 600;
    color: #8d94ac;
    padding: 0 16px;
}

.info-main-price .saleoff {
    padding: 2px 0;
    border: 1px solid var(--color-red);
    font-weight: 600;
    color: var(--color-red);
}

.info-vat .item {
    font-size: 12px;
    color: #3e4b75;
    font-weight: 600;
    padding: 5px 8px;
    background: #ededed;
    margin-right: 8px;
}

.choose-quantity span {
    font-weight: 600;
    color: #8d94ac;
    white-space: nowrap;
}

.product-detail .unit-detail-amount-control {
    margin-left: 16px;
    width: calc(100% - 76px);
}

.unit-detail-amount-control a {
    width: 50px;
    text-align: center;
    border: 1px solid #ccc;
}

.product-detail .unit-detail-amount-control input {
    width: calc(100% - 100px);
    border: 1px solid #ccc;
    text-align: center;
    font-size: 20px;
    font-weight: 700;
}

.unit-detail-amount-control i {
    color: #000;
    font-size: 20px;
}

/*  */

.image-big img {
    width: 100%;
    cursor: pointer;
}

.image-thumbnails {
    display: flex;
    gap: 10px;
    margin-top: 10px;
}

.image-thumbnails img {
    width: 80px;
    height: 60px;
    cursor: pointer;
    border: 2px solid transparent;
}

.image-thumbnails img.active {
    border-color: #ff6600;
}

.product-main-image {
    width: 100%;
    height: auto;
    cursor: pointer;
}
</style>
