<template>
    <div>
        <div class="content-right">
            <div class="form-voucher background-white">
                <h2 class="fs-4 fw-semibold">Nhập mã voucher</h2>
                <input class="voucher-input" placeholder="Nhập mã khuyến mãi">
                <div class="info-voucher d-flex">
                    Chưa nhập mã voucher nào
                </div>
                <div class="note">Mã giảm giá và phiếu mua hàng sẽ khổng thể dùng lại sau khi đã đặt mua
                    hàng
                </div>
            </div>
            <div class="ground-info-product background-white mt-4">
                <h2 class="fs-4 fw-semibold">Thông tin giỏ hàng</h2>
                <div class="content-product">

                    <div v-for="cart in isShowMore ? carts : carts.slice(0, 2)" :key="cart.cartId"
                        class="item-product mt-3 row d-flex align-items-center">
                        <router-link :to="`/products/${cart.productId}`" class="col-md-3">
                            <img :src="cart.imageUrl" :alt="cart.name" class="img-fluid">
                        </router-link>
                        <div class="info col-md-9 fw-semibold p-0">
                            <router-link :to="`/products/${cart.productId}`" class="fs-6 text-dark line-clamp-2">
                                {{ cart.name }}
                            </router-link>
                            <div class="price text-danger mt-1">{{ Number(cart.priceNew).toLocaleString('vi-VN')
                            }}đ</div>
                        </div>
                    </div>

                </div>

                <button @click="toggleShowMore" class="more-all d-block text-center mt-1 mx-auto">
                    {{ isShowMore ? "Thu gọn" : "Xem tất cả" }}
                    <i class="mdi mdi-chevron-down ms-0"></i>
                </button>

                <div class="total-price fs-6">

                    <div class="d-flex align-items-center item justify-space-between">
                        <b>Tổng số lượng sản phẩm</b>
                        <b>{{ countItems }}</b>
                    </div>

                    <div class="d-flex align-items-center item justify-space-between mt-2">
                        <b>Tổng chi phí</b>
                        <div class="text-danger fw-semibold fs-5">{{ Number(totalCartPrice).toLocaleString('vi-VN')
                            }}đ </div>
                    </div>
                    <span class="vat text-end d-block mt-2">
                        Đã bao gồm VAT [nếu có]
                    </span>
                </div>

                <div class="btn-buy mt-4">
                    <a v-if="isConfirmBuy" @click="handleConfirmOrder" class="button-send-cart">
                        <span>Xác nhận mua hàng</span>
                    </a>

                    <router-link v-else to="/me/cart/cart-confirm-buy" class="button-send-cart">
                        <span>Tiến hành thanh toán</span>
                    </router-link>
                </div>


                <div class="icon-pay">
                    <img src="https://www.tncstore.vn/static/assets/default/images/pay_cart.png" alt="pay"
                        class="img-fluid">
                </div>
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
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';

export default {
    props: {
        carts: {
            type: Array,
            required: true
        },
        countItems: {
            type: Number,
            required: true
        },
        totalCartPrice: {
            type: Number,
            required: true
        },
        isConfirmBuy: {
            type: Boolean,
            required: true
        },
        orderData: {
            type: Object,
            required: false
        }
    },
    setup(props, { emit }) {
        const isShowMore = ref(false);


        const toggleShowMore = () => {
            isShowMore.value = !isShowMore.value;
        }

        const handleConfirmOrder = () => {
            emit("confirmOrder"); // Gửi sự kiện lên PageCart.vue
        };

        return {
            isShowMore,
            toggleShowMore,
            handleConfirmOrder
        }
    }
}
</script>

<style>
.page-cart .icon-pay {
    padding: 24px 0px;
    border-bottom: 1px solid rgb(237, 237, 237);
}

.page-cart .total-price {
    margin-top: 12px;
    padding-top: 24px;
    border-top: 1px solid rgb(237, 237, 237);
}

.page-cart .button-send-cart {
    display: block;
    width: 100%;
    height: 50px;
    font-size: 16px;
    font-weight: 600;
    color: #fff;
    text-align: center;
    background: var(--color-global);
    margin-top: 24px;
    line-height: 50px;
    position: relative;
    overflow: hidden;
    outline: none;
    border: none;
}

.page-cart .button-send-cart span {
    position: relative;
    z-index: 1;
}

.page-cart .button-send-cart::before {
    position: absolute;
    content: "";
    width: 0;
    height: 42px;
    top: 4px;
    left: 0;
    -webkit-clip-path: polygon(0 0, 100% 0, 95% 100%, 0 100%);
    clip-path: polygon(0 0, 100% 0, 95% 100%, 0 100%);
    background: #193c7b;
    transition: .5s;
    opacity: 0;
}

.page-cart .button-send-cart:hover::before {
    width: 120%;
    opacity: 1;
}

.page-cart .form-voucher .voucher-input {
    width: 100%;
    height: 40px;
    padding: 8px;
    border: 1px solid #ccc;
    margin: 24px 0;
    font-size: 16px;
}

.page-cart .form-voucher .voucher-input:focus-within {
    border: 2px solid var(--color-global);
    outline: none;
}

.page-cart .form-voucher .info-voucher {
    border: 1px solid #13ad05;
    padding: 16px;
    margin-bottom: 8px;
    display: none;
}

.page-cart .form-voucher .note {
    color: #8d94ac;
}
</style>