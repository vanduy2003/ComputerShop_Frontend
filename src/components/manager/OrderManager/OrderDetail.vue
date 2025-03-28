<template>
    <div class="manage wrappers">
        <AdminSidebar />
        <AdminNavbar />
        <div class="content p-4">
            <div class="background-white order-detail-content">
                <div class="info-customer mb-4 fs-6 border-bottom pb-4">
                    <div class="d-flex justify-content-between align-items-center">
                        <router-link to="/admin/order-list-manage" class="d-flex align-items-center">
                            <v-btn icon variant="tonal">
                                <span class="mdi mdi-arrow-left fs-4"></span>
                            </v-btn>
                        </router-link>

                        <div class="text-end">
                            <v-select v-model="order.order_status" :items="statusOptions" item-title="label"
                                item-value="value" class="custom-select" :class="getStatusClass(order.order_status)"
                                density="compact" variant="outlined" color="primary" hide-details="true"
                                @update:modelValue="handleStatusChange" />
                        </div>
                    </div>


                    <h3 class="title-detail fs-4 fw-semibold mb-4 text-center">Thông tin chi tiết đơn hàng</h3>

                    <!-- Thông tin đơn hàng -->
                    <div class="d-flex justify-content-center align-items-center">
                        <v-simple-table class="order-info-table">
                            <tbody>
                                <tr>
                                    <td><b>Mã đơn hàng:</b></td>
                                    <td>#HDTNC{{ order.orderId }}HD</td>
                                </tr>
                                <tr>
                                    <td><b>Tên khách hàng:</b></td>
                                    <td>{{ order.receiver_name }}</td>
                                </tr>
                                <tr>
                                    <td><b>Số điện thoại:</b></td>
                                    <td>{{ order.phone_number }}</td>
                                </tr>
                                <tr>
                                    <td><b>Email:</b></td>
                                    <td>khtncstore@gmail.com</td>
                                </tr>
                                <tr>
                                    <td><b>Giao đến:</b></td>
                                    <td>{{ order.address }} - {{ order.ward }} - {{ order.district }} - {{
                                        order.province }}
                                    </td>
                                </tr>
                                <tr>
                                    <td><b>Phương thức thanh toán:</b></td>
                                    <td>{{ order.payment_method }}</td>
                                </tr>
                                <tr>
                                    <td><b>Ngày đặt hàng:</b></td>
                                    <td>{{ order.updated_at }}</td>
                                </tr>
                                <tr>
                                    <td><b>Phí vận chuyển:</b></td>
                                    <td class="red">Miễn phí</td>
                                </tr>
                            </tbody>
                        </v-simple-table>
                    </div>

                    <!-- Danh sách sản phẩm -->
                    <h3 class="title-detail fs-4 fw-semibold mt-4  text-center">Thông tin sản phẩm</h3>
                    <div class="d-flex justify-content-center align-items-center">
                        <v-simple-table class="order-products-table mt-2">
                            <template v-slot:default>
                                <thead>
                                    <tr>
                                        <th>Hình ảnh</th>
                                        <th>Tên sản phẩm</th>
                                        <th>Giá</th>
                                        <th>Số lượng</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="item in order.cartItems" :key="item.productId">
                                        <td style="width: 150px;">
                                            <img :src="item.product_image" alt="Ảnh sản phẩm" class="img-fluid"
                                                style="width: 100px;">
                                        </td>
                                        <td>
                                            <a href="/pc-core-ultra-5-nova-4060-ti.html"
                                                class="fs-6 text-dark line-clamp-2">
                                                {{ item.product_name }}
                                            </a>
                                        </td>
                                        <td class="text-danger">
                                            {{ Number(item.price).toLocaleString('vi-VN') }}đ
                                        </td>
                                        <td>
                                            {{ item.quantity }}
                                        </td>
                                    </tr>
                                </tbody>
                            </template>
                        </v-simple-table>
                    </div>

                    <!-- Tổng kết -->
                    <div class="d-flex justify-content-center align-items-center">
                        <v-simple-table class="order-summary-table mt-4">
                            <tbody>
                                <tr>
                                    <td><b>Tổng số lượng sản phẩm:</b></td>
                                    <td>{{ order.countItems }}</td>
                                </tr>
                                <tr>
                                    <td><b>Tổng chi phí:</b></td>
                                    <td class="text-danger fw-semibold fs-5">
                                        {{ Number(order.total_price).toLocaleString('vi-VN') }}đ
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2" class="text-end">
                                        <span class="vat">Đã bao gồm VAT [nếu có]</span>
                                    </td>
                                </tr>
                            </tbody>
                        </v-simple-table>
                    </div>

                    <button class="btn-creat btn-deltete-order" @click="handleDeleteOrder(order.orderId)">
                        <v-icon>mdi mdi-delete-empty</v-icon>
                        <span>Xóa đơn hàng </span>
                    </button>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import { storeToRefs } from 'pinia'
import AdminNavbar from '../Dashboard/AdminNavbar.vue'
import AdminSidebar from '../Dashboard/AdminSidebar.vue'
import { useOrderStore } from '@/stores/oderStore'
import { onMounted, } from 'vue'
import { useToast } from 'vue-toastification'
import { useRouter } from "vue-router";



export default {
    components: {
        AdminNavbar,
        AdminSidebar,
    },

    props: {
        orderId: String
    },

    setup(props) {
        const orderStore = useOrderStore()
        const { order } = storeToRefs(orderStore)
        const toast = useToast()
        const router = useRouter()

        onMounted(async () => {
            await orderStore.fetchOrderById(props.orderId)
        })

        const statusOptions = [
            { label: "🔄 Chờ xử lý", value: "pending" },
            { label: "✅ Đã xác nhận", value: "confirmed" },
            { label: "🎉 Đã hoàn thành", value: "completed" },
            { label: "❌ Đã hủy", value: "cancelled" },
            { label: "🚚 Đang giao hàng", value: "shiping" },
            { label: "🚚 Giao hàng thành công", value: "shiped" }
        ];

        // Hàm trả về class màu sắc dựa theo trạng thái
        const getStatusClass = (status) => {
            switch (status) {
                case "pending": return "badge bg-warning text-dark";
                case "confirmed": return "badge bg-primary";
                case "completed": return "badge bg-success";
                case "cancelled": return "badge bg-danger";
                case "shiping": return "badge bg-info";
                case "shiped": return "badge bg-secondary";
                default: return "badge bg-secondary";
            }
        };

        // Hàm trả về label hiển thị
        const getStatusLabel = (status) => {
            const found = statusOptions.find(opt => opt.value === status);
            return found ? found.label : "Không xác định";
        };

        const handleStatusChange = async (newStatus) => {
            try {
                const respone = await orderStore.updateOrderStatus(order.value.orderId, newStatus);
                if (respone) {
                    toast.success("Cập nhật trạng thái đơn hàng thành công!");
                }
            } catch (error) {
                toast.error("Cập nhật trạng thái đơn hàng thất bại!");
            }
        };

        const handleDeleteOrder = async (orderId) => {
            const confirmed = confirm("Bạn có chắc chắn muốn xóa đơn hàng này?");
            if (!confirmed) return;

            try {
                await orderStore.deleteOrder(orderId);
                toast.success("Xóa đơn hàng thành công!");
                router.push("/admin/order-list-manage");
            } catch (error) {
                toast.error("Xóa đơn hàng thất bại!");
            }
        };


        return {
            order,
            statusOptions,
            getStatusClass,
            getStatusLabel,
            handleStatusChange,
            handleDeleteOrder
        }
    }
}
</script>


<style>
.custom-select {
    max-width: 230px;
    width: 100%;
    border-radius: 8px;
    font-weight: bold;
}

.btn-creat.btn-deltete-order {
    background: rgb(255, 51, 28);
    display: block;
    margin: 30px auto;
    color: white;
    padding: 10px 20px;
}


.title-detail {
    font-size: 24px;
    font-weight: 700;
    text-transform: uppercase;
}

.order-detail-content {
    border-radius: 10px;
}

.order-info-table {
    max-width: 800px;
    border-collapse: collapse;
    background: white;
}

.order-info-table td {
    padding: 10px;
    border-bottom: 1px solid #ddd;
}

.order-info-table td:first-child {
    font-weight: bold;
    width: 40%;
    background: #f8f9fa;
    /* Nền nhạt cho cột tiêu đề */
}


.order-info-table,
.order-products-table,
.order-summary-table {
    border: 1px solid #c0c0c0;
    table-layout: fixed;
    /* Cố định layout bảng để chia đều cột */
    border-collapse: collapse;
    background: white;
}

.order-info-table td,
.order-products-table td,
.order-summary-table td {
    padding: 10px;
    border: 1px solid #c0c0c0;
    text-align: center;
}

.order-products-table th {
    background: #f8f9fa;
    font-weight: bold;
    border: 1px solid #c0c0c0;
}

.order-summary-table td:first-child {
    font-weight: bold;
    width: 50%;
}
</style>