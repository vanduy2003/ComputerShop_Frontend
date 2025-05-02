<template>
    <div class="form-product">
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
                        <a href="" class="text-custom">
                            <span itemprop="name"> ĐƠN HÀNG CỦA TÔI </span>
                        </a>
                    </li>
                </ol>
            </div>

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
                                        <p class="card-category line-clamp-1">Tổng đơn hàng</p>
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
                                        <i class="mdi mdi-radiobox-blank"></i>
                                    </div>
                                </div>
                                <div class="col col-stats ms-3 ms-sm-0">
                                    <div class="numbers">
                                        <p class="card-category line-clamp-1">Chờ xác nhận</p>
                                        <h4 class="card-title mb-0 fs-5">{{
                                            pendingOrders
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
                                        <i class="mdi mdi-check-decagram"></i>
                                    </div>
                                </div>
                                <div class="col col-stats ms-3 ms-sm-0">
                                    <div class="numbers">
                                        <p class="card-category line-clamp-1">Đã hoàn thành</p>
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
                                        <i class="mdi mdi-close-box"></i>
                                    </div>
                                </div>
                                <div class="col col-stats ms-3 ms-sm-0">
                                    <div class="numbers">
                                        <p class="card-category line-clamp-1">Đã hủy</p>
                                        <h4 class="card-title mb-0 fs-5">{{ cancelledOrders }}</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="orders.length > 0">
                <!-- Control status order -->
                <v-row align="center" justify="space-between" class="status-container pa-4 mb-1">
                    <v-col cols="auto" class="status-item" :class="{ active: activeStatus === 'all' }"
                        @click="setStatus('all')">
                        Tất cả đơn hàng
                    </v-col>
                    <v-col cols="auto" class="status-item" :class="{ active: activeStatus === 'pending' }"
                        @click="setStatus('pending')">
                        Chờ xác nhận
                    </v-col>
                    <v-col cols="auto" class="status-item" :class="{ active: activeStatus === 'confirmed' }"
                        @click="setStatus('confirmed')">
                        Đã xác nhận
                    </v-col>
                    <v-col cols="auto" class="status-item" :class="{ active: activeStatus === 'shiping' }"
                        @click="setStatus('shiping')">
                        Đang giao hàng
                    </v-col>
                    <v-col cols="auto" class="status-item" :class="{ active: activeStatus === 'completed' }"
                        @click="setStatus('completed')">
                        Đã hoàn thành
                    </v-col>
                    <v-col cols="auto" class="status-item" :class="{ active: activeStatus === 'cancelled' }"
                        @click="setStatus('cancelled')">
                        Đã hủy
                    </v-col>
                </v-row>

                <div v-if="filteredOrders.length > 0">
                    <v-card v-for="order in filteredOrders" :key="order.orderId" class="pa-4 mb-3 shadow-lg fs-6">
                        <!-- Header -->
                        <v-row align="center" justify="space-between">
                            <v-col cols="auto" class="d-flex align-center">
                                <v-avatar size="40" class="mr-2">
                                    <v-img src="https://i.imgur.com/J3svmnM.png"></v-img>
                                </v-avatar>
                                <strong>Mã đơn hàng: #HDTNC{{ order.orderId }}HD</strong>
                            </v-col>
                            <v-col cols="auto">
                                <span class="text-success font-weight-bold">{{ order.created_at }}</span>
                            </v-col>
                            <v-col cols="auto">
                                <v-chip color="primary" v-if="order.order_status === 'confirmed'">Đã xác nhận</v-chip>
                                <v-chip color="error" v-else-if="order.order_status === 'cancelled'">Đã hủy</v-chip>
                                <v-chip color="warning" v-else-if="order.order_status === 'pending'">Chờ xử lý</v-chip>
                                <v-chip color="success" v-else-if="order.order_status === 'completed'">Đã hoàn
                                    thành</v-chip>
                                <v-chip color="purple-accent-3" v-else-if="order.order_status === 'shiping'">Đang giao
                                    hàng</v-chip>
                                <v-chip color="yellow-accent-4" v-else-if="order.order_status === 'shiped'">Giao thành
                                    công</v-chip>
                            </v-col>
                        </v-row>

                        <v-divider class="my-3"></v-divider>

                        <!-- Danh sách sản phẩm -->
                        <v-row v-for="item in order.cartItems" :key="item.productId" class="align-center">
                            <v-col cols="2">
                                <v-img :src="item.product_image" contain height="100"></v-img>
                            </v-col>
                            <v-col cols="6">
                                <p class="font-weight-bold">{{ item.product_name }}</p>

                                <v-chip color="blue lighten-4"> Hoàn trả miễn phí trong 30 ngày </v-chip>
                                <div class="mt-1">
                                    {{
                                        item.highlightType === "Best Choice"
                                            ? "🎁 Vòng quay may mắn"
                                            : "🎁 Quà tặng ngẫu nhiên"
                                    }}
                                </div>
                            </v-col>
                            <v-col cols="2" class="text-right text-danger">
                                <strong v-if="item.price !== 'FREE'">{{ Number(item.subtotal).toLocaleString("vi-VN") }}
                                    vnđ</strong>
                                <span v-else class="text-red">FREE</span>
                            </v-col>
                            <v-col cols="2" class="text-right text-muted fw-semibold">
                                Số lượng: {{ item.quantity }}
                            </v-col>

                            <v-divider class="my-3"></v-divider>
                        </v-row>

                        <v-row align="center" justify="end" class="">
                            <v-col cols="auto">
                                <strong>Tổng số lượng sản phẩm:</strong>
                            </v-col>
                            <v-col cols="auto">
                                <strong class="text-danger">{{ order.countItems }}</strong>
                            </v-col>
                        </v-row>

                        <!-- Tổng cộng -->
                        <v-row align="center" justify="end" class="mt-0">
                            <v-col cols="auto">
                                <strong>Tổng chi phí:</strong>
                            </v-col>
                            <v-col cols="auto">
                                <strong class="text-danger fs-5">{{ Number(order.total_price).toLocaleString("vi-VN") }}
                                    vnđ</strong>
                            </v-col>
                        </v-row>

                        <!-- Nút Xem Chi Tiết (đặt giữa đơn hàng, dưới danh sách sản phẩm) -->
                        <v-row align="center" justify="center">
                            <v-btn color="primary" variant="tonal" class="fw-semibold"
                                @click="viewOrderDetail(order.orderId)">
                                <v-icon left class="me-2">mdi-eye</v-icon> Chi tiết đơn hàng
                            </v-btn>
                        </v-row>

                    </v-card>
                </div>

                <div v-else>
                    <v-img
                        src="https://cdni.iconscout.com/illustration/premium/thumb/boy-with-no-goods-in-shopping-cart-illustration-download-svg-png-gif-file-formats--empty-order-data-basket-pack-e-commerce-illustrations-10018100.png?f=webp"
                        height="400px"></v-img>
                    <p class="text-center fs-5 fw-semibold">Dữ liệu đang được cập nhật....</p>
                </div>
            </div>

            <div v-else>
                <v-card class="pa-4 mb-3 shadow-lg fs-6">
                    <v-img
                        src="https://cdni.iconscout.com/illustration/premium/thumb/boy-with-no-goods-in-shopping-cart-illustration-download-svg-png-gif-file-formats--empty-order-data-basket-pack-e-commerce-illustrations-10018100.png?f=webp"
                        height="400px"></v-img>
                    <p class="text-center fs-5 fw-semibold">Không có đơn hàng nào!!!</p>
                </v-card>
            </div>
        </div>
    </div>
</template>

<script>
import { useOrderStore } from "@/stores/oderStore";
import { useUserStore } from "@/stores/userStore";
import { storeToRefs } from "pinia";
import { onMounted, computed, ref } from "vue";
import { useRouter } from "vue-router";

export default {
    setup() {
        const oderStore = useOrderStore();
        const { orders, countOrders, cancelledOrders, pendingOrders, completedOrders, } = storeToRefs(oderStore);
        const userStore = useUserStore();
        const { user } = storeToRefs(userStore);
        const activeStatus = ref("all"); // Mặc định là tất cả đơn hàng
        const router = useRouter();

        // Lọc đơn hàng theo trạng thái
        const filteredOrders = computed(() => {
            if (activeStatus.value === "all") {
                return orders.value;
            }
            return orders.value.filter((order) => order.order_status === activeStatus.value);
        });

        // Cập nhật trạng thái lọc
        const setActiveStatus = (status) => {
            activeStatus.value = status;
        };

        onMounted(async () => {
            await oderStore.fetchOrderByUser(user.value.userId);
            console.log("orders");
        });

        const setStatus = (status) => {
            activeStatus.value = status;
        };

        const viewOrderDetail = (orderId) => {
            router.push(`/me/order/order-detail/${orderId}`);
        };

        return {
            orders,
            setStatus,
            activeStatus,
            countOrders,
            cancelledOrders,
            pendingOrders,
            completedOrders,
            filteredOrders,
            setActiveStatus,
            viewOrderDetail,
        };
    },
};
</script>

<style scoped>
.text-custom {
    color: #0073e6;
}

.text-success {
    color: #008000;
}

/* Kiểu dáng cho thanh trạng thái đơn hàng */
.status-container {
    border-radius: 8px;
    padding: 12px 0;
}

.status-item {
    font-size: 16px;
    font-weight: 600;
    color: #fff5f5;
    cursor: pointer;
    padding: 10px 16px;
    transition: all 0.3s ease-in-out;
    width: 16.66%;
    background: #19a7ff;
    text-align: center;
    margin-right: 19;
    border: 1px solid #ffffff;
}

.status-item:hover {
    background-color: #54b8ff;
    color: #ffffff;
}

.status-item.active {
    background-color: #0d6efd;
    color: white;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
