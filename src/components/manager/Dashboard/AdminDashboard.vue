<template>
    <div class="wrappers">
        <AdminSidebar />
        <AdminNavbar />
        <div class="">
            <div class="page-inner p-4">
                <div class="pb-2">
                    <h3 class="fw-bold mb-2">Computer Shop Management</h3>
                    <h6 class="op-7 mb-2">Chiều lòng khách đến, Vừa lòng khách đi</h6>
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
                                            <h4 class="card-title">1,294</h4>
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
                                            <p class="card-category">Thu Nhập</p>
                                            <h4 class="card-title">1303</h4>
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
                                            <h4 class="card-title">{{ totalProducts }}</h4>
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
                                            <h4 class="card-title">576</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="d-flex chart-cercal">
                    <div class="chart-container col-md-8">
                        <h3 class="fw-semibold fs-6">Revenue</h3>
                        <LineChart :chart-data="chartData" :chart-options="chartOptions" />
                    </div>
                    <div class="card  ms-4">
                        <h3 class="title">Website Visitors</h3>
                        <DoughnutChart :chart-data="chartData1" :chart-options="chartOptions1" class="chart" />
                        <ul class="legend fw-semibold">
                            <li v-for="(item, index) in legendData" :key="index">
                                <span class="dot" :style="{ backgroundColor: item.color }"></span>
                                <span>{{ item.label }}</span>
                                <span>{{ item.value }}%</span>
                            </li>
                        </ul>
                    </div>
                </div>


            </div>
        </div>
    </div>
</template>

<script>
import AdminNavbar from './AdminNavbar.vue';
import AdminSidebar from './AdminSidebar.vue';
import { LineChart, DoughnutChart } from "vue-chart-3";
import { Chart, registerables, ArcElement, Tooltip, Legend } from "chart.js";
import { useProductStore } from '@/stores/productStore';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
// Đăng ký các thành phần cần thiết của Chart.js
Chart.register(...registerables, ArcElement, Tooltip, Legend);

export default {
    components: {
        AdminNavbar,
        AdminSidebar,
        LineChart,
        DoughnutChart,
    },

    setup() {
        const productsStore = useProductStore();
        const { totalProducts } = storeToRefs(productsStore);


        onMounted(() => {
            productsStore.fetchProducts();
        });

        const chartData = {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],

            datasets: [
                {
                    label: "Google ads",
                    data: [50, 200, 80, 160, 140, 120, 130, 90],
                    borderColor: "#00c48f",
                    backgroundColor: "rgba(0, 196, 143, 0.2)",
                    borderWidth: 4, // Độ dày của đường line
                    borderDash: [], // Định dạng đường nét đứt (gạch - cách - gạch - cách)
                    pointBorderColor: "#fff",
                    pointBackgroundColor: "#00c48f",
                    pointRadius: 10, // Kích thước điểm
                    pointHoverRadius: 14, // Tăng kích thước điểm khi hover
                    tension: 0.4, // Làm đường cong mượt hơn
                },
                {
                    label: "Facebook ads",
                    data: [30, 100, 180, 60, 50, 300, 90, 150],
                    borderColor: "#ff8f32",
                    backgroundColor: "rgba(255, 143, 50, 0.2)",
                    borderWidth: 4,
                    borderDash: [], // Giữ đường nét liền
                    pointBorderColor: "#fff",
                    pointBackgroundColor: "#ff8f32",
                    pointRadius: 10,
                    pointHoverRadius: 14,
                    tension: 0.4,
                },
            ],
        };

        const chartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: "index", // Hiển thị tooltip cho tất cả datasets khi hover
                intersect: false, // Không yêu cầu di chuột chính xác vào điểm dữ liệu
            },
            plugins: {
                legend: {
                    display: true,
                    position: "top",
                    labels: {
                        color: "#666",
                        usePointStyle: true,
                    },
                },
                tooltip: {
                    enabled: true,
                    backgroundColor: "rgba(0, 0, 0, 0.7)", // Nền của tooltip
                    titleColor: "#fff",
                    bodyColor: "#fff",
                    bodyFont: { size: 14 },
                    cornerRadius: 6,
                    displayColors: false, // Ẩn ô màu trong tooltip
                },
            },
            scales: {
                x: {
                    grid: {
                        display: false,
                    },
                },
                y: {
                    grid: {
                        display: false,
                    },
                },
            },
            animation: {
                duration: 1000, // Hiệu ứng kéo dài 1s
                easing: "easeInOutQuad", // Hiệu ứng mượt hơn
            },
            hover: {
                mode: "nearest",
                intersect: true,
                animationDuration: 400, // Hiệu ứng hover nhanh hơn
            },
        };

        const chartData1 = {
            datasets: [
                {
                    data: [38, 22, 12, 28], // Tỷ lệ %
                    backgroundColor: ["#ff8f32", "#00c48f", "#6ec8f4", "#ff5252"],
                    borderWidth: 5,
                    borderRadius: 10, // Làm tròn viền
                    cutout: "70%", // Làm rỗng giữa
                },
            ],
        };

        const chartOptions1 = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false, // Ẩn legend mặc định
                },
                tooltip: {
                    enabled: true,
                    backgroundColor: "#333",
                    titleColor: "#fff",
                    bodyColor: "#fff",
                    cornerRadius: 6,
                },
            },
        };

        const legendData = [
            { label: "Direct", value: 38, color: "#ff8f32" },
            { label: "Organic", value: 22, color: "#00c48f" },
            { label: "Paid", value: 12, color: "#6ec8f4" },
            { label: "Social", value: 28, color: "#ff5252" },
        ];


        return {
            chartData,
            chartOptions,
            chartData1,
            chartOptions1,
            legendData,
            totalProducts,
        }
    }
}
</script>

<style scoped>
.wrappers {
    height: 100vh;
    background: linear-gradient(314deg, #ff7ebc 0%, #ffffad 40%, #ffa0b6 80%);
}

.card {
    background: #fff;
    padding: 20px;
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
    justify-content: space-between;
    font-size: 14px;
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
    min-height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
}

.card-stats .col-icon {
    width: 65px;
    height: 65px;
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
    margin-top: 8px;
    font-size: 1rem;
    color: #8d9498;
    margin-bottom: 0;
    word-break: normal;
}
</style>