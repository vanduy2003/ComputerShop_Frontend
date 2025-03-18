<template>
    <div class="send-cart">
        <div class="content-send-cart">

            <div class="title">
                <i class="mdi mdi-check-underline-circle"></i>
                <h2>Mua hàng thành công</h2>
                <div class="note fs-6 text-center lh-base mb-4">
                    Thông tin chi tiết về đơn hàng đã được gửi đến địa chỉ email <a
                        href="mailto:khtncstore@gmail.com">khtncstore@gmail.com</a>. Nếu không
                    tìm thấy email này,
                    xin quý khách vui lòng kiểm tra thư mục Spam. Nếu có yêu cầu đặc biệt, xin quý khách vui lòng liên
                    hệ nhân viên tư vấn
                    tại <a href="">Facebook</a> TNC hoặc hotline mua hàng trực tuyến: <a href="tel:19001903">1900
                        1903</a>
                </div>
            </div>
            <div class="background-white">
                <div class="info-customer mb-4 fs-6 border-bottom pb-4">
                    <h3 class="fs-4 fw-semibold mb-4">Thông tin giao hàng</h3>
                    <div class="item d-flex align-items-center mb-2">
                        <b>Mã đơn hàng:</b>
                        <span>#HDTNC{{ order.orderId }}HD</span>
                    </div>
                    <div class="item d-flex align-items-center mb-2">
                        <b>Tên khách hàng: </b>
                        <span>{{ order.receiver_name }}</span>
                    </div>
                    <div class="item d-flex align-items-center mb-2">
                        <b>Số điện thoại: </b>
                        <span>{{ order.phone_number }}</span>
                    </div>
                    <div class="item d-flex align-items-center mb-2">
                        <b>Email:</b>
                        <span>khtncstore@gmail.com</span>
                    </div>
                    <div class="item d-flex align-items-center mb-2">
                        <b>Giao đến: </b>
                        <span>{{ order.address }} - {{ order.ward }} - {{ order.district }} - {{ order.province
                            }}</span>
                    </div>
                    <div class="item d-flex align-items-center mb-2">
                        <b>Phương thức thanh toán: </b>
                        <span>{{ order.payment_method }}</span>
                    </div>
                    <div class="item d-flex align-items-center mb-2">
                        <b>Ngày đặt hàng: </b>
                        <span>{{ order.updated_at }}</span>
                    </div>
                    <div class="item d-flex align-items-center mb-2">
                        <b>Phí vận chuyển: </b>
                        <span class="red">Miễn phí</span>
                    </div>
                </div>
                <div class="group-info-product">
                    <h3 class="fs-4 fw-semibold mb-4">Thông tin giỏ hàng</h3>

                    <div class="content-product">

                        <div v-for="item in order.cartItems" :key="item.productId"
                            class="item-product row d-flex align-items-center mt-4">
                            <a href="/pc-core-ultra-5-nova-4060-ti.html" class="col-md-2">
                                <img :src="item.product_image" alt="PC Core Ultra 5 - Nova 4060 Ti" class="img-fluid">

                            </a>
                            <div class="info col-md-10 fw-semibold ">
                                <a href="/pc-core-ultra-5-nova-4060-ti.html" class="fs-6 text-dark line-clamp-2">
                                    {{ item.product_name }}
                                </a>
                                <div class="price mt-1">
                                    <b class="text-danger">{{ Number(item.price).toLocaleString('vi-VN')
                                    }}đ</b>
                                    <div class="d-flex align-items-center ">
                                        <b class="me-1">Số lượng:</b>
                                        <span>{{ item.quantity }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="total-price mt-4 border-top pt-4 fs-6">
                        <div class="d-flex align-items-center item justify-space-between">
                            <b>Tổng số lượng sản phẩm</b>
                            <b>{{ order.countItems }}</b>
                        </div>

                        <div class="d-flex align-items-center item justify-space-between mt-2">
                            <b>Tổng chi phí</b>
                            <div class="text-danger fw-semibold fs-5">{{
                                Number(order.total_price).toLocaleString('vi-VN')
                            }}đ </div>
                        </div>
                        <span class="vat text-end d-block mt-2">
                            Đã bao gồm VAT [nếu có]
                        </span>
                    </div>


                </div>
                <div class="btn-group d-flex align-items-center mt-4">
                    <router-link to="/chat" class="item" target="_blank">
                        Chat với TNC
                    </router-link>
                    <router-link to="/" class="item mx-0">Tiết tục mua hàng</router-link>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import dayjs from "dayjs";

export default {
    setup() {
        const route = useRoute();
        const orderId = ref(route.params.id); // ✅ Lấy orderId từ route params
        const order = ref({});
        const isLoading = ref(true);



        onMounted(async () => {
            console.log("🖥️ Order ID từ route params:", orderId.value); // 📌 Kiểm tra orderId trong console

            if (!orderId.value) {
                console.error("❌ Không có orderId trong URL!");
                isLoading.value = false;
                return;
            }

            try {
                const response = await axios.get(`http://localhost:3000/api/v1/data/buy-success/${orderId.value}`);
                if (response.data.success) {

                    // format ngày tháng
                    response.data.order.updated_at = dayjs(response.data.order.updated_at).format("DD/MM/YYYY, HH:mm A");

                    order.value = response.data.order;

                } else {
                    console.error("⚠️ Đơn hàng không tồn tại!");
                }
            } catch (error) {
                console.error("Lỗi khi lấy đơn hàng:", error);
            } finally {
                isLoading.value = false;
            }
        });

        return {

            order,
            isLoading,

        }
    }
}
</script>

<style>
.send-cart .btn-group .item {
    width: 50%;
    margin-right: 24px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    border: 1px solid var(--color-global);
    color: var(--color-global);
    font-size: 16px;
    font-weight: 600;
}

.send-cart .btn-group .item:hover {
    background: var(--color-global);
    color: #fff;
}

.send-cart .info-customer .item b {
    width: 220px;
}

.send-cart .content-send-cart h2 {
    text-align: center;
    font-size: 32px;
    font-weight: 700;
    margin: 5px 0 16px;
    text-transform: uppercase;
    color: #29324e;
}

.send-cart {
    width: 800px;
    margin: 32px auto;
}

.send-cart .content-send-cart i {
    font-size: 80px;
    text-align: center;
    color: #13ad05;
    display: block;
}
</style>