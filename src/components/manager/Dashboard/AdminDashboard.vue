<template>
    <div class="wrappers">
        <AdminSidebar />
        <AdminNavbar />
        <div class="">
            <div class="page-inner p-4">
                <div class="pb-2">
                    <h3 class="fw-bold mb-2">COMPUTER SHOP MANAGERMENT</h3>
                    <h6 class="op-7 mb-2 text-gradient">TẬN TÂM - TRÁCH NHIỆM - SÁNG TẠO - KHÁC BIỆT</h6>
                </div>

                <div class="row">
                    <div class="col-sm-6 col-md-3">
                        <div class="card card-stats card-round">
                            <div class="card-body">
                                <div class="row align-items-center">
                                    <div class="col-icon">
                                        <div class="icon-big text-center icon-primary bubble-shadow-small">
                                            <i class="mdi mdi-account-group"></i>
                                        </div>
                                    </div>
                                    <div class="col col-stats ms-3 ms-sm-0">
                                        <div class="numbers">
                                            <p class="card-category">Khách Hàng</p>
                                            <h4 class="card-title mb-0 fs-5">{{ countUsers }}</h4>
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
                                            <p class="card-category">Doanh Thu</p>
                                            <h4 class="card-title mb-0 fs-5">{{
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
                                            <i class="mdi mdi-clipboard-list-outline"></i>
                                        </div>
                                    </div>
                                    <div class="col col-stats ms-3 ms-sm-0">
                                        <div class="numbers">
                                            <p class="card-category">Sản Phẩm</p>
                                            <h4 class="card-title mb-0 fs-5">{{ totalProducts }}</h4>
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
                                        <div class="icon-big text-center icon-secondary bubble-shadow-small">
                                            <i class="mdi mdi-check-decagram"></i>
                                        </div>
                                    </div>
                                    <div class="col col-stats ms-3 ms-sm-0">
                                        <div class="numbers">
                                            <p class="card-category">Đơn Hàng</p>
                                            <h4 class="card-title mb-0 fs-5">{{ countOrders }}</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Biểu đồ Doanh Thu -->
                <div class="d-flex gap-4 ">
                    <!-- Thống kê tổng doanh thu -->
                    <div class="col-md-7 revenue">
                        <h3 class="fw-semibold fs-4">Doanh Thu📈</h3>
                        <div class="mb-3">
                            <label for="revenueType" class="form-label">Xem Doanh Thu Theo</label>
                            <select id="revenueType" v-model="selectedRevenueType" class="form-select"
                                @change="updateRevenueChartData">
                                <option value="day">--- Doanh Thu Theo Ngày ---</option>
                                <option value="week">--- Doanh Thu Theo Tuần ---</option>
                                <option value="month">--- Doanh Thu Theo Tháng ---</option>
                            </select>

                        </div>

                        <LineChart :chart-data="revenueChartData" :chart-options="chartOptions" />
                    </div>
                    <!-- Thống kê số đơn hàng theo trạng thái -->
                    <div class="col-md-4 revenue">
                        <h3 class="fw-semibold fs-4">Số Đơn Hàng Theo Trạng Thái</h3>
                        <BarChart :chart-data="orderStatusChartData" :chart-options="chartOptions" />
                    </div>
                </div>

                <!-- Thống kê sản phẩm bán chạy nhất -->
                <div class="d-flex gap-4 ">

                    <div class="col-md-7  revenue">
                        <h3 class="fw-semibold fs-4">Top 10 Sản Phẩm Bán Chạy Nhất🏆</h3>
                        <div class="topselling card-round">
                            <div class="card-body">
                                <ul class="legend fw-semibold">
                                    <li v-for="item in topSellingProducts" :key="item.productId">
                                        <img :src="item.productImage" alt="Product" class="object-cover rounded mr-3"
                                            width="90" />
                                        <div>
                                            <div class="">
                                                <router-link :to="`/products/${item.productId}`"
                                                    class="line-clamp-2 text-black">
                                                    {{ item.productName }}
                                                </router-link>
                                            </div>
                                            <div class="text-primary">Giá bán: {{
                                                Number(item.priceNew).toLocaleString('vi-VN')
                                                }}₫</div>
                                            <div class="text-danger">Đã bán: {{ item.totalSold }} sản phẩm
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-4 revenue">
                        <h3 class="fw-semibold fs-4">Tỷ Lệ Trạng Thái Đơn Hàng</h3>
                        <PieChart class="mt-4" :chart-data="orderRateChartData" />
                    </div>

                </div>

                <!-- Thống kê sản phẩm sắp hết hàng -->
                <div class="d-flex gap-4 ">

                    <div class="col-md-7  revenue">
                        <h3 class="fw-semibold fs-4">Các Sản Phẩm Sắp Hết Hàng</h3>
                        <div class="topselling card-round">
                            <div class="card-body">
                                <ul class="legend fw-semibold">
                                    <li v-for="item in outOfStockProducts" :key="item.productId" class="mb-3">
                                        <!-- THÊM DIV BỌC D-FLEX Ở ĐÂY -->
                                        <div class="d-flex align-items-start gap-3">
                                            <img :src="item.imageUrl" alt="Product" class="object-cover " width="100" />

                                            <div class="flex-grow-1">
                                                <router-link :to="`/products/${item.productId}`"
                                                    class="line-clamp-2 text-black">
                                                    {{ item.name }}
                                                </router-link>

                                                <div class="mt-2">
                                                    <div class="text-danger">
                                                        Còn lại: {{ item.stockQuantity }} sản phẩm
                                                    </div>
                                                    <router-link :to="`/admin/products/edit/${item.productId}`"
                                                        class="text-primary fw-semibold btn-in">
                                                        Nhập hàng ngay
                                                    </router-link>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-4 revenue">
                        <h3 class="fw-semibold fs-4">Khách Hàng Tiềm Năng⭐</h3>
                        <div class="topselling card-round">
                            <ul class="potential-customers-list legend">
                                <li v-for="customer in potentialCustomers" :key="customer.id" class="mb-2">
                                    <div class="d-flex align-items-center gap-3">
                                        <img :src="customer.avatar" width="80" height="80" alt="" class="rounded-circle"
                                            style="object-fit:cover" />

                                        <div class="flex-grow-1">
                                            <strong class="line-clamp-2 text-black">
                                                {{ customer.username }}
                                            </strong>
                                            <div class="fw-semibold">
                                                <div class="text-primary">
                                                    Đơn hàng thành công: {{ customer.total_orders }}
                                                </div>

                                                <div class="text-danger">
                                                    Tổng tiền: {{
                                                        Number(customer.total_spent).toLocaleString('vi-VN')
                                                    }}₫
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    </div>
</template>

<script>
import AdminNavbar from './AdminNavbar.vue';
import AdminSidebar from './AdminSidebar.vue';
import { LineChart, BarChart, PieChart } from "vue-chart-3";
import { Chart, registerables, ArcElement, Tooltip, Legend } from "chart.js";
import { useProductStore } from '@/stores/productStore';
import { useUserStore } from '@/stores/userStore';
import { storeToRefs } from 'pinia';
import { onMounted, watch, reactive, ref } from 'vue';
import { useOrderStore } from '@/stores/oderStore';
import dayjs from 'dayjs';
// Đăng ký các thành phần cần thiết của Chart.js
Chart.register(...registerables, ArcElement, Tooltip, Legend);

export default {
    components: {
        AdminNavbar,
        AdminSidebar,
        LineChart,
        BarChart,
        PieChart
    },

    setup() {
        const productsStore = useProductStore();
        const { totalProducts, topSellingProducts, outOfStockProducts } = storeToRefs(productsStore);
        const ordersStore = useOrderStore();
        const { orders, totalOrders, countOrders, cancelledOrders, completedOrders, potentialCustomers } = storeToRefs(ordersStore);
        const selectedRevenueType = ref("month"); // Mặc định theo tháng
        const userStore = useUserStore();
        const { countUsers } = storeToRefs(userStore);

        onMounted(() => {
            productsStore.fetchProducts();
            productsStore.fetchTopSellingProducts();
            ordersStore.fetchOders();
            userStore.getAllUsers();
            ordersStore.fetchPotentialCustomers();
        });

        // Biểu đồ Doanh Thu theo Thời Gian (Line Chart)
        const revenueChartData = reactive({
            labels: [], // Labels cho từng tháng
            datasets: [
                {
                    label: "Doanh Thu",
                    data: [], // Dữ liệu doanh thu từng tháng
                    borderColor: "#00c48f", // Màu đường biều đồ
                    backgroundColor: "rgba(0, 196, 143, 0.2)", // Màu nền
                    borderWidth: 4,
                    tension: 0.4, // Mượt đường biểu đồ
                },
            ],
        });

        // Cập nhật dữ liệu cho biểu đồ doanh thu
        const updateRevenueChartData = () => {
            let labels = [];
            let dataMap = {};

            if (selectedRevenueType.value === "month") {
                // 12 tháng
                labels = [
                    "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
                    "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
                ];
                for (let i = 1; i <= 12; i++) dataMap[i] = 0;

                orders.value.forEach((order) => {
                    if (order.order_status === 'completed') {
                        const month = dayjs(order.created_at, "DD/MM/YYYY, HH:mm").month() + 1;
                        dataMap[month] += Number(order.total_price);
                    }
                });
                revenueChartData.labels = labels;
                revenueChartData.datasets[0].data = Object.values(dataMap);
            }

            else if (selectedRevenueType.value === "day") {
                const now = dayjs();
                const currentMonth = now.month(); // 0-11
                const currentYear = now.year();
                const daysInMonth = now.daysInMonth(); // Số ngày trong tháng hiện tại

                const days = [];
                dataMap = {};

                for (let i = 1; i <= daysInMonth; i++) {
                    const label = i.toString().padStart(2, "0") + "/" + (currentMonth + 1).toString().padStart(2, "0");
                    days.push(label);
                    dataMap[label] = 0;
                }

                orders.value.forEach((order) => {
                    if (order.order_status === 'completed') {
                        const orderDate = dayjs(order.created_at, "DD/MM/YYYY, HH:mm");
                        if (orderDate.month() === currentMonth && orderDate.year() === currentYear) {
                            const dayLabel = orderDate.format("DD/MM");
                            if (Object.prototype.hasOwnProperty.call(dataMap, dayLabel)) {

                                dataMap[dayLabel] += Number(order.total_price);
                            }
                        }
                    }
                });

                revenueChartData.labels = days;
                revenueChartData.datasets[0].data = Object.values(dataMap);
            }

            else if (selectedRevenueType.value === "week") {
                // Doanh thu theo tuần (4 tuần gần nhất)
                const weeks = ["Tuần 1", "Tuần 2", "Tuần 3", "Tuần 4"];
                for (let i = 1; i <= 4; i++) dataMap[i] = 0;

                orders.value.forEach((order) => {
                    if (order.order_status === 'completed') {
                        const weekDiff = Math.floor(
                            (dayjs().diff(dayjs(order.created_at, "DD/MM/YYYY, HH:mm"), "day")) / 7
                        );
                        const weekIndex = 4 - weekDiff;
                        if (weekIndex >= 1 && weekIndex <= 4) {
                            dataMap[weekIndex] += Number(order.total_price);
                        }
                    }
                });

                revenueChartData.labels = weeks;
                revenueChartData.datasets[0].data = Object.values(dataMap);
            }
        };

        // Biểu đồ Số Đơn Hàng Theo Trạng Thái (Bar Chart)
        const orderStatusChartData = reactive({
            labels: ["Pending", "Completed", "Cancelled", "shiping", "confirmed"], // Các trạng thái đơn hàng
            datasets: [
                {
                    label: "Số Đơn Hàng",
                    data: [0, 0, 0], // Mặc định số lượng đơn hàng
                    backgroundColor: [
                        "#36a2eb", // Màu cho trạng thái Completed
                        "#52ff09", // Màu cho trạng thái Cancelled
                        "#ff6384", // Màu cho trạng thái Pending    
                        "#4bc0c0", // Màu cho trạng thái shiping
                        "#9966ff"  // Màu cho trạng thái confirmed
                    ],
                    borderWidth: 1,
                },
            ],
        });

        // Cập nhật dữ liệu cho số lượng đơn hàng theo trạng thái
        const updateOrderStatusChartData = () => {
            const statusCount = {
                pending: 0,
                completed: 0,
                cancelled: 0,
                shiping: 0,
                confirmed: 0
            };

            // Đếm số lượng đơn hàng theo trạng thái
            orders.value.forEach((order) => {
                if (order.order_status === 'pending') statusCount.pending++;
                if (order.order_status === 'completed') statusCount.completed++;
                if (order.order_status === 'cancelled') statusCount.cancelled++;
                if (order.order_status === 'shiping') statusCount.shiping++;
                if (order.order_status === 'confirmed') statusCount.confirmed++;
            });

            // Đặt dữ liệu vào biểu đồ
            orderStatusChartData.datasets[0].data = [
                statusCount.pending,
                statusCount.completed,
                statusCount.cancelled,
                statusCount.shiping,
                statusCount.confirmed
            ];
        };

        // Biểu đồ Tỷ Lệ Trạng Thái Đơn Hàng (Pie Chart)
        const orderRateChartData = reactive({
            labels: ["Hoàn thành", "Bị hủy"],
            datasets: [
                {
                    data: [0, 0], // Giá trị sẽ được cập nhật bên dưới
                    backgroundColor: ["#00c48f", "#ff4d4f"], // Màu cho từng phần
                    borderWidth: 1,
                },
            ],
        });

        // Cập nhật dữ liệu cho tỷ lệ trạng thái đơn hàng
        const updateOrderRateChart = () => {
            const completed = orders.value.filter(o => o.order_status === 'completed').length;
            const cancelled = orders.value.filter(o => o.order_status === 'cancelled').length;

            orderRateChartData.datasets[0].data = [completed, cancelled];
        };


        // Cập nhật dữ liệu biểu đồ khi dữ liệu đơn hàng thay đổi
        watch(orders, () => {
            updateRevenueChartData();
            updateOrderStatusChartData();
            updateOrderRateChart();
        });

        const chartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: "top",
                    labels: {
                        color: "#666",
                    },
                },
                tooltip: {
                    enabled: true,
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    titleColor: "#fff",
                    bodyColor: "#fff",
                },
            },
            scales: {
                x: {
                    grid: { display: false },
                },
                y: {
                    grid: { display: false },
                },
            },
        };

        return {
            totalProducts,
            totalOrders,
            countOrders,
            cancelledOrders,
            completedOrders,
            potentialCustomers,
            revenueChartData,
            orderStatusChartData,
            chartOptions,
            selectedRevenueType,
            updateRevenueChartData,
            updateOrderStatusChartData,
            updateOrderRateChart,
            orderRateChartData,
            countUsers,
            topSellingProducts,
            outOfStockProducts,
        }
    }
}
</script>

<style>
#bar-chart {
    height: 450px !important;
}

.btn-in {
    display: inline-block;
    border: 1px solid #007bff;
    margin-top: 10px;
    padding: 5px 10px;
    border-radius: 5px;
    text-decoration: none;
}

.revenue {
    background: rgb(255, 255, 255);
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 30px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    border: 1px solid #ddd;
}

.topselling {
    max-height: 500px;
    overflow-y: auto;

}

.wrappers {
    background: linear-gradient(to right, #a391ff, #20bdff, #a5fecb);
}

.text-gradient {
    font-size: 20px;
    font-weight: bold;
    text-transform: uppercase;
    background: linear-gradient(to right, #ff0000, #003bff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.card {
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
    width: 100%;
}

.title {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 10px;
}

.chart {
    height: 150px;
    width: 150px;
    margin: auto;
}

.legend {
    list-style: none;
    padding: 0;
    margin-top: 10px;
}

.legend li {
    display: flex;
    align-items: center;
    font-size: 16px;
    margin: 5px 0;
    border-bottom: 1px solid #ddd;
    padding-bottom: 5px;
}

.legend .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    display: inline-block;
    margin-right: 8px;
}


.chart-container {
    background: white;
    padding: 20px;
    border-radius: 10px;
}

.card-round {
    border-radius: 10px;
}

.card-stats .icon-big {
    width: 100%;
    height: 100%;
    font-size: 2.2em;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
}

.card-stats .col-icon {
    width: 55px;

    padding-left: 0;
    padding-right: 0;
    margin-left: 15px;
    color: white;
}

.card-stats .icon-big.icon-primary {
    background: #1572e8;
}

.card-stats .icon-big.icon-info {
    background: #48abf7;
}

.card-stats .icon-big.icon-success {
    background: #31ce36;
}

.card-stats .icon-big.icon-secondary {
    background: #6861ce;
}

.card-stats .icon-big.icon-danger {
    background: #ff120a;
}


.card {
    margin-bottom: 30px;
    -webkit-box-shadow: 2px 6px 15px 0 rgba(69, 65, 78, .1);
    -moz-box-shadow: 2px 6px 15px 0 rgba(69, 65, 78, .1);
    box-shadow: 2px 6px 15px 0 rgba(69, 65, 78, .1);
    border: 0;
}

.card-stats .col-stats {
    align-items: center;
    display: flex;
    padding-left: 15px;
}

.card-category {
    margin-bottom: 5px;
    font-size: 18px;
    color: #8d9498;
    font-weight: bold;
    word-break: normal;
}
</style>