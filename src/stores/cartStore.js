import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import { useUserStore } from "@/stores/userStore";
import { computed } from "vue";
import { useToast } from "vue-toastification";
import { safeParseJSON } from "../utils/utils"; // Import hàm parse JSON
import { useRouter } from "vue-router";

export const useCartStore = defineStore("cart", () => {
    const cart = ref([]);
    const userStore = useUserStore(); // Lấy userStore
    const userId = computed(() => userStore.user?.userId); // Lấy userId từ userStore
    const toast = useToast();
    const orderId = ref(null);
    const router = useRouter();

    // Computed để tính tổng số lượng sản phẩm trong giỏ hàng
    const countItems = computed(() => {
        return cart.value.reduce((total, item) => total + item.quantity, 0);
    });

    // ✅ Tính tổng chi phí giỏ hàng (số lượng * đơn giá từng sản phẩm)
    const totalCartPrice = computed(() => {
        return cart.value.reduce(
            (total, item) => total + item.quantity * item.priceNew,
            0
        );
    });

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

            toast.success("Sản phẩm đã được thêm thành công!");
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
        if (!confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) return;

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

            orderId.value = response.data.orderId;

            if (!response.data.success) {
                throw new Error(
                    response.data.message || "Tạo đơn hàng thất bại!"
                );
            }

            if (response.data.success) {
                orderId.value = response.data.orderId; // ✅ Lấy orderId từ response
                toast.success("Đặt hàng thành công!");
                cart.value = []; // Reset giỏ hàng
                return response.data.orderId;
            } else {
                toast.error("Đặt hàng thất bại!, vui lòng thử lại!");
            }
        } catch (error) {
            console.error("Lỗi khi tạo đơn hàng:", error);
            toast.error(error.response?.data?.message || "Đặt hàng thất bại!");
        }
    };

    return {
        cart,
        userId,
        countItems,
        totalCartPrice,
        orderId,
        addToCart,
        fetchCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        createOrder,
        buyToCart,
    };
});
