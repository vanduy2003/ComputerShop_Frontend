<template>
    <div style="background-color: #f3f3f3;">
        <HeaderApp />
        <div class="send-cart">
            <div class="content-send-cart">
                <div class="content-header">
                    <i class="mdi mdi-information"></i>
                    <h2>Chi tiết đơn hàng</h2>
                    <div class="note fs-6 text-center lh-base mb-4">
                        Thông tin chi tiết về đơn hàng đã được gửi đến địa chỉ email <a
                            href="mailto:khtncstore@gmail.com">khtncstore@gmail.com</a>. Nếu không
                        tìm thấy email này,
                        xin quý khách vui lòng kiểm tra thư mục Spam. Nếu có yêu cầu đặc biệt, xin quý khách vui lòng
                        liên
                        hệ nhân viên tư vấn
                        tại <a href="">Facebook</a> TNC hoặc hotline mua hàng trực tuyến: <a href="tel:19001903">1900
                            1903</a>
                    </div>
                </div>
                <div class="background-white">
                    <div class="info-customer mb-4 fs-6 border-bottom pb-4">
                        <div class="order-status text-center">
                            <v-chip color="primary" v-if="order.order_status === 'confirmed'">Đã xác nhận</v-chip>
                            <v-chip color="error" v-else-if="order.order_status === 'cancelled'">Đã hủy</v-chip>
                            <v-chip color="warning" v-else-if="order.order_status === 'pending'">Chờ xử lý</v-chip>
                            <v-chip color="success" v-else-if="order.order_status === 'completed'">Đã hoàn
                                thành</v-chip>
                            <v-chip color="purple-accent-3" v-else-if="order.order_status === 'shiping'">Đang giao
                                hàng</v-chip>
                            <v-chip color="yellow-accent-4" v-else-if="order.order_status === 'shiped'">Giao thành
                                công</v-chip>
                        </div>

                        <v-divider class="my-3"></v-divider>

                        <div class="content-print d-flex align-items-center mb-4  justify-space-between">
                            <h3 class="fs-4 fw-semibold ">Thông tin giao hàng</h3>
                            <div class="btn-action-cart d-flex align-items-center fs-7">
                                <a href="#" class="item" @click.prevent="downloadOrder">
                                    <i class="mdi mdi-file-download-outline"></i> Tải đơn hàng
                                </a>

                                <a href="#" class="item" @click.prevent="printOrder">
                                    <i class="mdi mdi-printer"></i> In đơn hàng
                                </a>
                            </div>

                        </div>


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
                            <span>{{ order.email }}</span>
                        </div>
                        <div class="item d-flex align-items-center mb-2">
                            <b>Giao đến: </b>
                            <span>{{ order.address }} - {{ order.ward }} - {{ order.district }} - {{ order.province
                                }}</span>
                        </div>
                        <div class="item d-flex align-items-center mb-2">
                            <b>Phương thức thanh toán: </b>
                            <span>{{ order.payment_method === "momo" ? "Thanh toán bằng ví Momo" :
                                order.payment_method }}</span>
                        </div>
                        <div class="item d-flex align-items-center mb-2">
                            <b>Ngày đặt hàng: </b>
                            <span>{{ order.updated_at }}</span>
                        </div>
                        <div class="item d-flex align-items-center mb-2">
                            <b>Phí vận chuyển: </b>
                            <span class="red">Miễn phí vận chuyển</span>
                        </div>
                    </div>
                    <div class="group-info-product">
                        <h3 class="fs-4 fw-semibold mb-4">Thông tin giỏ hàng</h3>

                        <div class="content-product">

                            <div v-for="item in order.cartItems" :key="item.productId"
                                class="item-product row d-flex align-items-center mt-4">
                                <a href="/pc-core-ultra-5-nova-4060-ti.html" class="col-md-2">
                                    <img :src="item.product_image" alt="PC Core Ultra 5 - Nova 4060 Ti"
                                        class="img-fluid">


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
                        <button @click="cancelOrder" class="item item-cancel">
                            Hủy đơn hàng
                        </button>
                        <router-link to="/" class="item mx-0">Tiếp tục mua hàng</router-link>
                    </div>

                </div>

            </div>
        </div>
        <FooterApp />
        <SocialIcon />
    </div>

</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import dayjs from "dayjs";
import HeaderApp from '@/components/Header/HeaderApp.vue';
import FooterApp from '@/components/Footer/FooterApp.vue';
import SocialIcon from '@/components/content/social/SocialIcon.vue';
import Swal from "sweetalert2"; // Thư viện thông báo đẹp
import { useOrderStore } from '@/stores/oderStore'
import jsPDF from "jspdf"; // 
import html2canvas from "html2canvas";

export default {

    components: {
        HeaderApp,
        FooterApp,
        SocialIcon,

    },
    setup() {
        const route = useRoute();
        const orderId = ref(route.params.id); // ✅ Lấy orderId từ route params
        const order = ref({});
        const isLoading = ref(true);
        const orderStore = useOrderStore()

        onMounted(async () => {

            if (!orderId.value) {
                console.error("❌ Không có orderId trong URL!");
                isLoading.value = false;
                return;
            }

            try {
                const response = await axios.get(`http://localhost:3000/api/v1/data/buy-success/${orderId.value}`);
                if (response.data.success) {

                    // format ngày tháng
                    if (response.data.order.updated_at) {
                        response.data.order.updated_at = dayjs(response.data.order.updated_at).format("DD/MM/YYYY, HH:mm A");
                    }


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

        // 🛠 Hàm hủy đơn hàng
        const cancelOrder = async () => {

            if (order.value.order_status === "cancelled") {
                Swal.fire("Thông báo!", "Đơn hàng này đã bị hủy trước đó!", "info");
                return;
            }

            // kiểm tra đơn hàng đã thành công thì không cho hủy
            if (order.value.order_status === "completed") {
                Swal.fire("Thông báo!", "Đơn hàng này đã hoàn thành, không thể hủy!", "info");
                return;
            }

            // kiểm tra đơn hàng đang giao hàng thì không cho hủy
            if (order.value.order_status === "shiping") {
                Swal.fire("Thông báo!", "Đơn hàng này đang giao hàng, không thể hủy!", "info");
                return;
            }

            try {
                const confirm = await Swal.fire({
                    title: "Bạn có chắc muốn hủy đơn hàng?",
                    text: "Hành động này không thể hoàn tác!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Có, hủy đơn!",
                    cancelButtonText: "Không",
                });

                if (!confirm.isConfirmed) return;

                // 🛠 Gửi yêu cầu cập nhật trạng thái thành "cancelled"
                const response = await orderStore.cancelOrder(orderId.value);


                if (response) {
                    order.value.order_status = "cancelled"; // Cập nhật UI ngay lập tức
                    Swal.fire("Đã hủy!", "Đơn hàng của bạn đã bị hủy.", "success");
                } else {
                    Swal.fire("Lỗi!", response.data.message, "error");
                }
            } catch (error) {
                console.error("Lỗi khi hủy đơn hàng:", error);
                Swal.fire("Lỗi!", "Không thể hủy đơn hàng. Vui lòng thử lại sau!", "error");
            }
        };

        // 🛠 Hàm in đơn hàng
        const printOrder = () => {
            window.print();
        };

        async function loadImagesBeforeCapture(element) {
            const images = element.getElementsByTagName("img");
            const promises = [];

            for (let img of images) {
                if (!img.complete) {
                    promises.push(new Promise((resolve, reject) => {
                        img.onload = resolve;
                        img.onerror = reject;
                    }));
                }
            }

            await Promise.allSettled(promises);

        }


        const downloadOrder = async () => {
            const element = document.querySelector(".background-white");
            if (!element) {
                console.error("Không tìm thấy nội dung đơn hàng để tải!");
                return;
            }

            // 🛠 Ẩn các phần không cần thiết
            const hiddenElements = document.querySelectorAll(".btn-action-cart, .btn-group, .order-status, header, footer, .social-icons");
            hiddenElements.forEach(el => el.style.visibility = "hidden");

            try {
                // ✅ Đảm bảo ảnh tải xong trước khi chụp
                await loadImagesBeforeCapture(document.querySelector(".background-white"));
                const canvas = await html2canvas(element, { scale: 2, useCORS: true, allowTaint: false });
                const imgData = canvas.toDataURL("image/png");

                // 🔄 Hiển thị lại các phần đã ẩn
                hiddenElements.forEach(el => el.style.visibility = "visible");

                // 📝 Xuất PDF
                const pdf = new jsPDF("p", "mm", "a4");
                const imgWidth = 210;
                const imgHeight = (canvas.height * imgWidth) / canvas.width;

                pdf.addImage(imgData, "PNG", 0, 10, imgWidth, imgHeight);
                pdf.save(`don-hang-${order.value.orderId}.pdf`);
            } catch (error) {
                Swal.fire("Lỗi!", "Không thể tạo file PDF. Vui lòng thử lại sau!", "error");
                console.error("Lỗi khi tạo file PDF:", error);
            }
        };

        return {
            order,
            isLoading,
            cancelOrder,
            printOrder,
            downloadOrder
        }
    }
}
</script>

<style scoped>
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

    .background-white {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
    }

    /* Ẩn các thành phần không cần in */
    .btn-action-cart,
    .btn-group,
    .order-status,

    .social-icons {
        display: none !important;
    }


}


.content-print .item {
    display: flex;
    align-items: center;
    margin-left: 24px;
    font-weight: 600;
    color: var(--color-global);
}

.content-print .item i {
    margin-right: 5px;
    font-size: 20px;
    display: block;
}

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

.send-cart .btn-group .item-cancel:hover {
    background: var(--color-red);
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
    width: 850px;
    margin: 32px auto;
}

.send-cart .content-header i {
    font-size: 80px;
    text-align: center;
    color: #11c7ff;
    display: block;
}
</style>