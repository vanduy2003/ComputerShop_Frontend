<template>
    <div>
        <div class="content-left">
            <div class="background-white">
                <div class="title d-flex align-items-center justify-space-between">
                    <h2 class="fs-4 fw-semibold">Thông tin sản phẩm</h2>
                    <div class="btn-action d-flex align-items-center fs-7">
                        <a href="#" class="item" @click.prevent="downloadOrder">
                            <i class="mdi mdi-file-download-outline"></i> Tải
                            báo giá
                        </a>
                        <a href="#" class="item" @click.prevent="printOrder">
                            <i class="mdi mdi-printer"></i> In báo giá
                        </a>
                    </div>
                </div>

                <div class="list-product-cart mt-3">
                    <div v-for="cart in carts" :key="cart.cartId" class="item-cart row pb-3 mb-3 border-bottom">
                        <router-link :to="`/products/${cart.productId}`" class="image col-md-2">
                            <img :src="cart.imageUrl" :alt="cart.name" class="img-fluid" />
                        </router-link>
                        <div class="info-product col-md-10">
                            <div class="d-flex justify-space-between">
                                <div class="name-price fs-5 fw-semibold">
                                    <router-link :to="`/products/${cart.productId}`" class="text-dark line-clamp-2">
                                        {{ cart.name }}
                                    </router-link>
                                    <div class="price text-danger mt-1">
                                        {{ Number(cart.priceNew).toLocaleString('vi-VN')
                                        }}đ
                                    </div>
                                </div>
                                <div class="cart-right">
                                    <div class="unit-detail-amount-control d-flex">
                                        <input type="text" size="7" :value="cart.quantity" readonly />
                                        <div class="d-flex flex-column">
                                            <a @click="increaseQuantity(cart.cartId)">
                                                <i class="mdi mdi-plus"></i>
                                            </a>
                                            <a @click="decreaseQuantity(cart.cartId)">
                                                <i class="mdi mdi-minus"></i>
                                            </a>
                                        </div>
                                    </div>
                                    <a href="#" class="remove text-center d-block fs-6 fw-semibold text-secondary mt-1"
                                        @click="removeFromCart(cart.cartId)">Xoá</a>
                                </div>
                            </div>

                            <div class="summary">
                                <span @click="toggleShowMore"
                                    class="hover-txt d-inline-block mb-1 fw-semibold fs-6 cursor-pointer text-primary">Chi
                                    tiết sản phẩm
                                    <i class="mdi mdi-chevron-down"></i>
                                </span>

                                <div v-show="isShowMore" class="summary-info my-2 fs-6">
                                    <v-list dense>
                                        <v-list-item v-for="component in cart.components" :key="component.componentId"
                                            class="component-item p-0">
                                            <v-list-item-content>
                                                <v-list-item-title>
                                                    <strong>{{ component.componentType }}: </strong>
                                                    <a href="#">
                                                        {{ component.component_name }}
                                                    </a>
                                                </v-list-item-title>
                                                <v-list-item-subtitle>
                                                    {{ component.specifications }} - Số lượng: {{ component.quantity }}
                                                </v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-list>
                                </div>
                            </div>

                            <div class="specialOffer mt-1">
                                <div class="title">
                                    <i class="mdi mdi-gift me-1"></i>
                                    Khuyến mại áp dụng
                                </div>
                                <div class="content">
                                    <p>
                                        <span style="font-size: 12pt">Nhận ngay cơ hội
                                            <strong>Xé túi mù 5090</strong> số
                                            lượng có hạn<span style="color: #ff9900"><strong><a style="color: #ff9900"
                                                        href="https://www.tncstore.vn/xe-tui-mu-thu-van-may-cung-tnc-store.html">TẠI
                                                        ĐÂY</a></strong></span></span>
                                    </p>
                                    <p>
                                        <span style="font-size: 12pt"><strong>Gói quà tặng bao gồm:</strong></span>
                                    </p>
                                    <p>
                                        <span style="font-size: 12pt">- Phiếu giảm giá trị giá 1.800.000
                                            Đồng (Đã được trừ thẳng vào
                                            giá)</span>
                                    </p>
                                    <p>
                                        <span style="font-size: 12pt">-<strong></strong>Tặng
                                            01<strong></strong>Bàn di
                                            chuột TNC</span>
                                    </p>
                                    <p>
                                        <span style="font-size: 12pt">- Tặng Voucher 5% tối đa 500k áp
                                            dụng cho KH mua Gear</span>
                                    </p>
                                    <p>
                                        <span style="font-size: 12pt">- Hỗ trợ trả góp với lãi suất
                                            0%</span>
                                    </p>
                                    <p>
                                        <span style="font-size: 12pt">- Tặng Voucher 5% tối đa 150K áp
                                            dụng cho KH mua màn hình</span>
                                    </p>
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
import { ref } from 'vue';
import { useCartStore } from "@/stores/cartStore";
import Swal from "sweetalert2"; // Thư viện thông báo đẹp

export default {
    props: {
        carts: {
            type: Array,
            required: true
        }
    },
    setup() {
        const store = useCartStore();
        const isShowMore = ref(false);
        const toggleShowMore = () => {
            isShowMore.value = !isShowMore.value;
        }

        const removeFromCart = (cartId) => {
            store.removeFromCart(cartId);
        }

        const increaseQuantity = (cartId) => {
            store.increaseQuantity(cartId);
        }

        const decreaseQuantity = (cartId) => {
            store.decreaseQuantity(cartId);
        }

        // 🛠 Hàm in đơn hàng
        const printOrder = () => {
            window.print();
        };

        const downloadOrder = () => {
            Swal.fire("Tính năng đang phát triển", "Chức năng này sẽ được cập nhật trong phiên bản sau", "info");
        }

        return {
            isShowMore,
            toggleShowMore,
            removeFromCart,
            increaseQuantity,
            decreaseQuantity,
            printOrder,
            downloadOrder
        }
    }
};
</script>

<style>
@media print {

    /* Ẩn tất cả nội dung mặc định */
    body * {
        visibility: hidden;
    }

    /* Chỉ hiển thị nội dung đơn hàng */
    .background-white,
    .background-white * {
        visibility: visible;
    }

    /* Ẩn các thành phần không cần in */
    .btn-action,
    .cart-right,
    .summary,
    .header,
    .footer,
    .btn-buy,
    .form-voucher,
    .social-icons {
        display: none !important;
    }


}

.content-left .v-list-item:hover {
    background-color: white;
}

.page-cart .item-cart .specialOffer .content {
    padding: 8px 12px;
    border: 1px solid var(--color-red);
}

.page-cart .item-cart .specialOffer .content p {
    margin-bottom: 0;
}

.page-cart .item-cart .specialOffer .title {
    padding: 8px 12px;
    background: var(--color-red);
    color: #fff;
    margin-bottom: 0;
}

.content-left .title .item {
    display: flex;
    align-items: center;
    margin-left: 24px;
    font-weight: 600;
    color: var(--color-global);
}

.content-left .title .item i {
    margin-right: 5px;
    font-size: 20px;
    display: block;
}

.list-product-cart .unit-detail-amount-control input {
    width: 50px;
    border: 1px solid #ccc;
    text-align: center;
    font-size: 20px;
    font-weight: bold;
}

.list-product-cart .unit-detail-amount-control a {
    width: 40px;
    height: 30px;
}
</style>
