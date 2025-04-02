<template>
    <div class="manage wrappers">
        <AdminSidebar />
        <AdminNavbar />
        <div class="content p-4">
            <h1 class="title text-white">Danh sách đơn hàng</h1>

            <div class="d-flex justify-content-between align-items-center mb-4">
                <div></div>
                <div class="btn-controll">
                    <v-select v-model="selectedStatus" :items="statusOptions" item-title="label" item-value="value"
                        class="custom-select" density="compact" variant="solo-filled" hide-details="true" />
                </div>
            </div>


            <!-- Table -->
            <v-card>
                <template v-slot:text>
                    <v-text-field v-model="search" label="Tìm kiếm" prepend-inner-icon="mdi-magnify" variant="outlined"
                        hide-details></v-text-field>
                </template>

                <v-data-table :headers="headers" :items="filteredOrders" :search="search" class="elevation-1">


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


export default {
    components: {
        AdminNavbar,
        AdminSidebar,

    },
    setup() {
        const search = ref('')
        const orderStore = useOrderStore()
        const { orders } = storeToRefs(orderStore)

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

        const formatProductNames = (productNames) => {
            if (!productNames) return "Chưa có sản phẩm";
            return productNames
                .split(", ")
                .map((name) => `• ${name}`)
                .join("<br>");
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
            filteredOrders,
            statusOptions
        }
    }
}
</script>


<style>
.v-chip__content {
    font-weight: bold;
}
</style>