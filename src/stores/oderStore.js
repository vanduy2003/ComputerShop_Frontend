import { defineStore } from "pinia";
import { ref, computed } from "vue";
import axios from "axios";
import dayjs from "dayjs";
import Swal from "sweetalert2";

export const useOrderStore = defineStore("orders", () => {
    const orders = ref([]);
    const order = ref({});
    const potentialCustomers = ref([]);

    // Tính tổng số đơn hàng
    const countOrders = computed(() => orders.value.length);

    // Tính số đơn hàng đang chờ xử lý
    const pendingOrders = computed(() => {
        return orders.value.filter((order) => order.order_status === "pending")
            .length;
    });

    // lấy khách hàng tiềm năng
    const fetchPotentialCustomers = async () => {
        try {
            const response = await axios.get(
                "http://localhost:3000/api/v1/data/potential-customers"
            );
            potentialCustomers.value = response.data.potentialCustomers;
        } catch (error) {
            console.error(error);
        }
    };

    // Tính tổng tiền của tất cả đơn hàng (đã hoàn thành)
    const totalOrders = computed(() => {
        return orders.value
            .filter((order) => order.order_status === "completed")
            .reduce((total, order) => {
                const price = Number(order.total_price); // Chuyển đổi sang số
                return total + (isNaN(price) ? 0 : price); // Nếu `price` là NaN, thay bằng 0
            }, 0);
    });

    // Tính số đơn hàng đã hủy
    const cancelledOrders = computed(() => {
        return orders.value.filter(
            (order) => order.order_status === "cancelled"
        ).length;
    });

    // Tính số đơn hàng đã hoàn thành
    const completedOrders = computed(() => {
        return orders.value.filter(
            (order) => order.order_status === "completed"
        ).length;
    });

    // Lấy danh sách đơn hàng
    const fetchOders = async () => {
        try {
            const response = await axios.get(
                "http://localhost:3000/api/v1/data/orders"
            );

            // Giữ lại giá trị gốc của created_at và chỉ định dạng khi cần
            orders.value = response.data.orders.map((order) => ({
                ...order,
                created_at: dayjs(order.created_at), // Giữ lại dayjs đối tượng
            }));
        } catch (error) {
            console.error(error);
        }
    };

    // Lấy thông tin đơn hàng theo ID
    const fetchOrderById = async (orderId) => {
        console.log("orderId", orderId);
        try {
            const response = await axios.get(
                `http://localhost:3000/api/v1/data/buy-success/${orderId}`
            );
            if (response.data.success) {
                // format ngày tháng
                response.data.order.updated_at = dayjs(
                    response.data.order.updated_at
                ).format("DD/MM/YYYY, HH:mm A");

                order.value = response.data.order;
            } else {
                console.error("⚠️ Đơn hàng không tồn tại!");
            }
        } catch (error) {
            console.error("Lỗi khi lấy đơn hàng:", error);
        }
    };

    // Cập nhật trạng thái đơn hàng
    const updateOrderStatus = async (orderId, status) => {
        try {
            const response = await axios.put(
                `http://localhost:3000/api/v1/data/update-status/${orderId}`,
                { status }
            );
            if (response.data.success) {
                return response.data.success;
            } else {
                console.error("⚠️ Cập nhật trạng thái đơn hàng thất bại!");
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật trạng thái đơn hàng:", error);
        }
    };

    // Xóa đơn hàng
    const deleteOrder = async (orderId) => {
        // Hiển thị thông báo xác nhận trước khi xóa
        const confirm = await Swal.fire({
            title: "Bạn có chắc chắn muốn xóa đơn hàng này?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Có, Xóa đơn hàng",
            cancelButtonText: "Hủy",
        });

        if (!confirm.isConfirmed) return; // Nếu người dùng không xác nhận thì không làm gì cả

        try {
            const response = await axios.delete(
                `http://localhost:3000/api/v1/data/delete-order/${orderId}`
            );
            if (response.data.success) {
                return response.data.success; // Trả về giá trị thành công
            } else {
                console.error("⚠️ Xóa đơn hàng thất bại!");
            }
        } catch (error) {
            console.error("Lỗi khi xóa đơn hàng:", error);
        }
    };

    // Lấy đơn hàng theo userId
    const fetchOrderByUser = async (userId) => {
        try {
            const response = await axios.get(
                `http://localhost:3000/api/v1/data/list-orders/${userId}`
            );

            orders.value = response.data.orders.map((order) => ({
                ...order,
                created_at: dayjs(order.created_at).format("DD/MM/YYYY, HH:mm"),
            }));
        } catch (error) {
            console.error(error);
        }
    };

    // Hủy đơn hàng
    const cancelOrder = async (orderId) => {
        try {
            // 🛠 Gửi yêu cầu cập nhật trạng thái thành "cancelled"
            const response = await axios.put(
                `http://localhost:3000/api/v1/data/update-status/${orderId}`,
                {
                    status: "cancelled",
                }
            );
            if (response.data.success) {
                console.log("Hủy đơn hàng thành công!");
                return response.data.success;
            } else {
                console.error("⚠️ Hủy đơn hàng thất bại!");
            }
        } catch (error) {
            console.error("Lỗi khi hủy đơn hàng:", error);
        }
    };

    return {
        orders,
        order,
        totalOrders,
        countOrders,
        cancelledOrders,
        pendingOrders,
        completedOrders,
        fetchOders,
        fetchOrderById,
        updateOrderStatus,
        deleteOrder,
        fetchOrderByUser,
        cancelOrder,
        fetchPotentialCustomers,
        potentialCustomers,
    };
});
