import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import { useUserStore } from "@/stores/userStore";
import { computed } from "vue";
import { useToast } from "vue-toastification";
import { safeParseJSON } from "../utils/utils"; // Import hàm parse JSON
import { useRouter } from "vue-router";
import Swal from "sweetalert2";

export const useCartStore = defineStore("cart", () => {
    const cart = ref([]);
    const userStore = useUserStore(); // Lấy userStore
    const userId = computed(() => userStore.user?.userId); // Lấy userId từ userStore
    const toast = useToast();
    const orderId = ref(null);
    const router = useRouter();
    const discount = ref(0); // Lưu giá trị giảm giá từ voucher

    // Computed để tính tổng số lượng sản phẩm trong giỏ hàng
    const countItems = computed(() => {
        return cart.value.reduce((total, item) => total + item.quantity, 0);
    });

    // ✅ Tổng giá chưa giảm
    const totalCartPrice = computed(() => {
        return cart.value.reduce(
            (total, item) => total + item.quantity * item.priceNew,
            0
        );
    });

    // ✅ Tổng giá sau khi áp dụng voucher
    const discountedTotal = computed(() => {
        return Math.max(0, totalCartPrice.value - discount.value);
    });

    // ✅ Hàm áp dụng mã giảm giá
    const applyVoucher = (voucherCode) => {
        const voucherList = [
            { code: "SALE1000", discount: 1000000 },
            { code: "DISCOUNT500", discount: 500000 },
            { code: "FREESHIP", discount: 50000 },
        ];

        const foundVoucher = voucherList.find(
            (v) => v.code === voucherCode.toUpperCase()
        );

        if (foundVoucher) {
            discount.value = foundVoucher.discount;
            toast.success(
                `Áp dụng mã: ${
                    foundVoucher.code
                } (-${foundVoucher.discount.toLocaleString("vi-VN")}đ)`
            );
        } else {
            discount.value = 0;
            toast.error("Mã giảm giá không hợp lệ");
        }
    };

    // Hàm thêm sản phẩm vào giỏ hàng
    const addToCart = async (productId, quantity) => {
        if (!userId.value) {
            // Truy cập giá trị thực của computed
            toast.error("Vui lòng đăng nhập để thêm vào giỏ hàng");
            return;
        }

        try {
            await axios.post(
                "http://localhost:3000/api/v1/data/add-cart",
                {
                    userId: userId.value, // Lấy giá trị thực, không truyền trực tiếp computed
                    productId,
                    quantity,
                },
                { withCredentials: true }
            );

            const confirm = await Swal.fire({
                icon: "success",
                title: "Thêm vào giỏ hàng thành công!",
                text: "Bạn có muốn xem giỏ hàng không?",
                showCancelButton: true,
                confirmButtonText: "Xem giỏ hàng",
                cancelButtonText: "Tiếp tục mua sắm",
            });

            if (confirm.isConfirmed) {
                router.push("/me/cart"); // ✅ Chuyển đến trang giỏ hàng
            }

            fetchCart(); // Cập nhật lại giỏ hàng
        } catch (error) {
            console.error("Lỗi khi thêm vào giỏ hàng:", error);
            toast.error("Thêm vào giỏ hàng thất bại!");
        }
    };

    // Hàm mua sản phẩm + vào giỏ hàng
    const buyToCart = async (productId, quantity) => {
        if (!userId.value) {
            toast.error("Vui lòng đăng nhập để mua sản phẩm");
            return;
        }

        try {
            await axios.post(
                "http://localhost:3000/api/v1/data/add-cart",
                {
                    userId: userId.value,
                    productId,
                    quantity,
                },
                { withCredentials: true }
            );

            router.push("/me/cart"); // Chuyển hướng đến trang giỏ hàng
            fetchCart(); // Cập nhật lại giỏ hàng
        } catch (error) {
            console.error("Lỗi khi mua sản phẩm:", error);
            toast.error(
                error.response?.data?.message || "Mua sản phẩm thất bại!"
            );
        }
    };

    // Hàm lấy giỏ hàng từ API
    const fetchCart = async () => {
        if (!userId.value) {
            toast.error("Vui lòng đăng nhập để xem giỏ hàng");
            return;
        }

        try {
            const response = await axios.get(
                `http://localhost:3000/api/v1/data/get-cart/${userId.value}`
            );

            // Parse JSON an toàn
            cart.value = response.data.map((item) => ({
                ...item,
                components: safeParseJSON(item.components, []),
            }));
        } catch (error) {
            console.error("Lỗi khi lấy giỏ hàng:", error);
        }
    };

    // Hàm xóa sản phẩm khỏi giỏ hàng
    const removeFromCart = async (cartId) => {
        const confirm = await Swal.fire({
            title: "Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Có, Xóa sản phẩm",
            cancelButtonText: "Hủy",
        });

        if (!confirm.isConfirmed) return; // Nếu người dùng không xác nhận thì không làm gì cả

        try {
            const response = await axios.delete(
                `http://localhost:3000/api/v1/data/delete-cart/${cartId}`
            );

            if (!response.data?.success) {
                throw new Error(
                    response.data?.message || "Xóa sản phẩm thất bại!"
                );
            }

            toast.success("Xóa sản phẩm thành công!");
            await fetchCart(); // Cập nhật lại giỏ hàng
        } catch (error) {
            console.error("Lỗi khi xóa giỏ hàng:", error);
            toast.error(
                error.response?.data?.message ||
                    "Xóa sản phẩm khỏi giỏ hàng thất bại!"
            );
        }
    };

    // Hàm tăng số lượng sản phẩm trong giỏ hàng
    const increaseQuantity = async (cartId) => {
        const item = cart.value.find((i) => i.cartId === cartId);
        if (!item) return;

        try {
            const response = await axios.put(
                "http://localhost:3000/api/v1/data/update-cart",
                {
                    cartId,
                    quantity: item.quantity + 1,
                }
            );

            if (!response.data.success) {
                throw new Error(response.data.message || "Cập nhật thất bại!");
            }
            item.quantity += 1; // Cập nhật trực tiếp trên giao diện
        } catch (error) {
            console.error("Lỗi khi tăng số lượng:", error);
            toast.error(
                error.response?.data?.message || "Tăng số lượng thất bại!"
            );
        }
    };

    // Hàm giảm số lượng sản phẩm trong giỏ hàng
    const decreaseQuantity = async (cartId) => {
        const item = cart.value.find((i) => i.cartId === cartId);
        if (!item || item.quantity <= 1) return;

        try {
            const response = await axios.put(
                "http://localhost:3000/api/v1/data/update-cart",
                {
                    cartId,
                    quantity: item.quantity - 1,
                }
            );

            if (!response.data.success) {
                throw new Error(response.data.message || "Cập nhật thất bại!");
            }

            item.quantity -= 1; // Cập nhật trực tiếp trên giao diện
        } catch (error) {
            console.error("Lỗi khi giảm số lượng:", error);
            toast.error(
                error.response?.data?.message || "Giảm số lượng thất bại!"
            );
        }
    };

    // Hàm tạo đơn hàng
    const createOrder = async (orderData) => {
        try {
            const response = await axios.post(
                "http://localhost:3000/api/v1/data/create-order",
                orderData
            );

            if (!response.data.success) {
                throw new Error(
                    response.data.message || "Tạo đơn hàng thất bại!"
                );
            }

            orderId.value = response.data.orderId;

            return response.data; // Trả về luôn toàn bộ response để xử lý sau
        } catch (error) {
            console.error("Lỗi khi tạo đơn hàng:", error);
            throw new Error(
                error.response?.data?.message || "Đặt hàng thất bại!"
            ); // 🔥 Ném lỗi ra ngoài để handleConfirmOrder bắt
        }
    };

    return {
        cart,
        userId,
        countItems,
        totalCartPrice,
        orderId,
        discountedTotal, // Giá sau khi giảm
        discount, // Giá trị giảm giá
        applyVoucher, // Hàm áp dụng mã giảm giá
        addToCart,
        fetchCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        createOrder,
        buyToCart,
    };
});
