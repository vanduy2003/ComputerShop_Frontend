<template>
    <div class="manage wrappers">
        <AdminSidebar />
        <AdminNavbar />
        <div class="content p-4">
            <h1 class="title text-white">Danh sách đơn hàng</h1>

            <div class="row">
                <div class="col-sm-6 col-md-3">
                    <div class="card card-stats card-round">
                        <div class="card-body">
                            <div class="row align-items-center">
                                <div class="col-icon">
                                    <div class="icon-big text-center icon-primary bubble-shadow-small">
                                        <i class="mdi mdi-ballot"></i>
                                    </div>
                                </div>
                                <div class="col col-stats ms-3 ms-sm-0">
                                    <div class="numbers">
                                        <p class="card-category line-clamp-1">Tổng Đơn Hàng</p>
                                        <h4 class="card-title mb-0 fs-5">{{ countOrders }}</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm-6 col-md-3">
                    <div class="card card-stats card-round">
                        <div class="card-body">
                            <div class="row align-items-center">
                                <div class="col-icon">
                                    <div class="icon-big text-center icon-info bubble-shadow-small">
                                        <i class="mdi mdi-cash-multiple"></i>
                                    </div>
                                </div>
                                <div class="col col-stats ms-3 ms-sm-0">
                                    <div class="numbers">
                                        <p class="card-category line-clamp-1">Doanh Thu</p>
                                        <h4 class="card-title mb-0 fs-5 line-clamp-1">{{
                                            Number(totalOrders).toLocaleString("vi-VN")
                                        }}
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm-6 col-md-3">
                    <div class="card card-stats card-round">
                        <div class="card-body">
                            <div class="row align-items-center">
                                <div class="col-icon">
                                    <div class="icon-big text-center icon-success bubble-shadow-small">
                                        <i class="mdi mdi-marker-check"></i>
                                    </div>
                                </div>
                                <div class="col col-stats ms-3 ms-sm-0">
                                    <div class="numbers">
                                        <p class="card-category line-clamp-1">Đã Hoàn Thành</p>
                                        <h4 class="card-title mb-0 fs-5">{{ completedOrders }}</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm-6 col-md-3">
                    <div class="card card-stats card-round">
                        <div class="card-body">
                            <div class="row align-items-center">
                                <div class="col-icon">
                                    <div class="icon-big text-center icon-danger bubble-shadow-small">
                                        <i class="mdi mdi-note-remove-outline"></i>
                                    </div>
                                </div>
                                <div class="col col-stats ms-3 ms-sm-0">
                                    <div class="numbers">
                                        <p class="card-category line-clamp-1">Đã Hủy</p>
                                        <h4 class="card-title mb-0 fs-5">{{ cancelledOrders }}</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="d-flex justify-content-end  mb-2">
                <div class="btn-controll">
                    <v-select v-model="selectedStatus" :items="statusOptions" item-title="label" item-value="value"
                        class="custom-select" density="compact" variant="solo-filled" hide-details="true" />
                </div>
                <button class="btn-creat excel  p-2 ms-2 fs-6 text-white" @click="exportToExcel">
                    <v-icon>mdi mdi-file-excel</v-icon>
                    <span>Xuất Excel</span>
                </button>
            </div>


            <!-- Table -->
            <v-card>
                <template v-slot:text>
                    <v-text-field v-model="search" label="Tìm kiếm" prepend-inner-icon="mdi-magnify" variant="outlined"
                        hide-details></v-text-field>
                </template>

                <v-data-table :headers="headers" :items="filteredOrders" :search="search" class="elevation-1">

                    <template v-slot:[`item.receiver_name`]="{ item }">
                        <div class="fw-semibold">{{ item.receiver_name }}</div>
                    </template>

                    <template v-slot:[`item.address`]="{ item }">
                        {{ item.address }}, {{ item.ward }}, {{ item.district }}, {{ item.province }}
                    </template>

                    <template v-slot:[`item.product_names`]="{ item }">
                        <span v-html="formatProductNames(item.product_names)"></span>
                    </template>

                    <template v-slot:[`item.order_status`]="{ item }">
                        <v-chip color="primary" v-if="item.order_status === 'confirmed'">Đã xác nhận</v-chip>
                        <v-chip color="error" v-else-if="item.order_status === 'cancelled'">Đã hủy</v-chip>
                        <v-chip color="warning" v-else-if="item.order_status === 'pending'">Chờ xử lý</v-chip>
                        <v-chip color="success" v-else-if="item.order_status === 'completed'">Đã hoàn thành</v-chip>
                        <v-chip color="purple-accent-3" v-else-if="item.order_status === 'shiping'">Đang giao
                            hàng</v-chip>
                        <v-chip color="yellow-accent-4" v-else-if="item.order_status === 'shiped'">Giao thành
                            công</v-chip>
                    </template>

                    <template v-slot:[`item.total_price`]="{ item }">
                        <div class="d-flex justify-center text-center">{{
                            Number(item.total_price).toLocaleString("vi-VN")
                        }}</div>
                    </template>

                    <template v-slot:[`item.phone_number`]="{ item }">
                        <div class="d-flex justify-center text-center">{{ item.phone_number }}</div>
                    </template>

                    <template v-slot:[`item.orderId`]="{ item }">
                        <div class="d-flex justify-center text-center">{{ item.orderId }}</div>
                    </template>

                    <template v-slot:[`item.actions`]="{ item }">
                        <p class="fw-semibold text-center mb-0  ">
                            <router-link :to="`/admin/order-detail/${item.orderId}`">
                                <span>Xem chi tiết</span>
                            </router-link>
                        </p>
                    </template>
                </v-data-table>
            </v-card>

        </div>
    </div>
</template>

<script>
import { storeToRefs } from 'pinia'
import AdminNavbar from '../Dashboard/AdminNavbar.vue'
import AdminSidebar from '../Dashboard/AdminSidebar.vue'
import { useOrderStore } from '@/stores/oderStore'
import { ref, onMounted, computed } from 'vue'
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";


export default {
    components: {
        AdminNavbar,
        AdminSidebar,

    },
    setup() {
        const search = ref('')
        const orderStore = useOrderStore()
        const { orders, totalOrders, countOrders, cancelledOrders, completedOrders } = storeToRefs(orderStore)

        const dialog = ref(false)

        onMounted(() => {
            orderStore.fetchOders()
        })

        const selectedStatus = ref(null); // Mặc định không lọc

        const filteredOrders = computed(() => {
            if (!selectedStatus.value) {
                return orders.value; // Nếu không chọn trạng thái nào, hiển thị tất cả đơn hàng
            }
            return orders.value.filter(order => order.order_status === selectedStatus.value);
        });


        const headers = [
            { title: 'ID', value: 'orderId' },
            { title: 'Họ Tên', value: 'receiver_name' },
            { title: 'Điện thoại', value: 'phone_number' },
            { title: 'Địa chỉ', value: 'address' },
            { title: 'Tên Sản phẩm', value: 'product_names', },
            { title: 'Tổng tiền', value: 'total_price' },
            { title: 'Trạng thái ', value: 'order_status' },
            { title: 'Actions', value: 'actions', sortable: false },
        ];

        //
        const formatProductNames = (productNames) => {
            if (!productNames) return "Chưa có sản phẩm";
            return productNames
                .split(", ")
                .map((name) => `• ${name}`)
                .join("<br>");
        };

        // Xuất dữ liệu ra file Excel
        const exportToExcel = () => {
            const worksheet = XLSX.utils.json_to_sheet(filteredOrders.value.map(order => ({
                "ID": order.orderId,
                "Họ Tên": order.receiver_name,
                "Điện thoại": order.phone_number,
                "Email": order.email,
                "Địa chỉ": `${order.address}, ${order.ward}, ${order.district}, ${order.province}`,
                "Tên Sản phẩm": formatProductNames(order.product_names),
                "Số lượng": order.countItems,
                "Tổng tiền": Number(order.total_price).toLocaleString("vi-VN"),
                "Phương thức thanh toán": order.payment_method,
                "Trạng thái": order.order_status,
                "Ngay đặt hàng": order.created_at,
            })));

            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Đơn hàng");

            const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
            const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
            saveAs(blob, `don_hang_${new Date().toLocaleDateString()}.xlsx`);
        };


        const statusOptions = [
            { label: " Tất cả đơn hàng", value: null },
            { label: "🔄 Chờ xử lý", value: "pending" },
            { label: "✅ Đã xác nhận", value: "confirmed" },
            { label: "🎉 Đã hoàn thành", value: "completed" },
            { label: "❌ Đã hủy", value: "cancelled" },
            { label: "🚚 Đang giao hàng", value: "shiping" },
            { label: "🚚 Giao hàng thành công", value: "shiped" }
        ];

        return {
            search,
            orders,
            headers,
            dialog,
            formatProductNames,
            selectedStatus,
            completedOrders,
            filteredOrders,
            statusOptions,
            totalOrders,
            countOrders,
            cancelledOrders,
            exportToExcel
        }
    }
}
</script>


<style>
.v-chip__content {
    font-weight: bold;
}
</style>