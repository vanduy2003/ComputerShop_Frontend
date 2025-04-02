import { defineStore } from "pinia";
import { ref, computed } from "vue";
import axios from "axios";
import { safeParseJSON } from "../utils/utils"; // Import hàm parse JSON
import Swal from "sweetalert2";
import { useRouter } from "vue-router";

export const useProductStore = defineStore("product", () => {
    // 🔹 State
    const products = ref([]);
    const product = ref({});
    const selectedImage = ref("");
    const components = ref([]);
    const loading = ref(false);
    const error = ref(null);
    const totalProducts = computed(() => products.value.length);
    const router = useRouter(); // Khởi tạo router

    // 🔹 Actions
    // 🟢 Lấy danh sách tất cả sản phẩm
    const fetchProducts = async () => {
        loading.value = true;
        error.value = null;
        try {
            const response = await axios.get(
                "http://localhost:3000/api/v1/data/products"
            );
            products.value = response.data;
        } catch (err) {
            error.value = "Không thể tải dữ liệu sản phẩm";
            console.error(err);
        } finally {
            loading.value = false;
        }
    };

    // 🟢 Lấy thông tin sản phẩm theo ID
    const fetchProductDataID = async (productId) => {
        productId = Number(productId); // Ép kiểu để tránh lỗi so sánh

        // 🛑 Nếu sản phẩm đã được load và đúng ID, không gọi API nữa
        if (product.value && product.value.id === productId) return;

        loading.value = true;
        error.value = null;
        try {
            const response = await axios.get(
                `http://localhost:3000/api/v1/data/products/${productId}`
            );
            if (!response.data || response.data.length === 0) {
                throw new Error("Không có dữ liệu sản phẩm");
            }

            let productData = response.data[0];

            // ✅ Parse JSON an toàn
            productData.imageDetail = safeParseJSON(
                productData.imageDetail,
                []
            );
            productData.components = safeParseJSON(productData.components, []);

            // ✅ Xác định ảnh chính một cách an toàn
            selectedImage.value =
                productData.imageUrl || // 🟢 Ưu tiên ảnh chính
                productData.imageDetail?.[0] || // 🔹 Nếu không có ảnh chính, lấy ảnh phụ đầu tiên
                "https://via.placeholder.com/500"; // 🔸 Nếu không có ảnh, dùng ảnh mặc định

            product.value = productData;
            components.value = productData.components;
        } catch (err) {
            error.value = "Không thể tải sản phẩm";
            console.error(err);
        } finally {
            loading.value = false;
        }
    };

    // 🟢 Thêm sản phẩm
    const addProduct = async (productData) => {
        try {
            const response = await axios.post(
                "http://localhost:3000/api/v1/data/product-add",
                productData
            );
            if (response.status === 201) {
                // Hiển thị thông báo thành công
                const confirm = await Swal.fire({
                    title: "Thêm sản phẩm thành công!",
                    icon: "success",
                    showCancelButton: true,
                    confirmButtonText: "Xem danh sách sản phẩm",
                    cancelButtonText: "Đóng",
                });

                if (confirm.isConfirmed) {
                    router.push("/admin/products-list-manage"); // Chuyển hướng đến danh sách sản phẩm
                }

                return true;
            }
        } catch (err) {
            error.value = "Không thể thêm sản phẩm";
            console.error(err);
        } finally {
            loading.value = false;
        }
    };

    // 🟢 Xóa sản phẩm
    const deleteProduct = async (productId) => {
        const confirm = await Swal.fire({
            title: "Bạn có chắc chắn muốn xóa sản phẩm này không?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Có, Xóa sản phẩm",
            cancelButtonText: "Hủy",
        });

        if (!confirm.isConfirmed) return; // Nếu người dùng không xác nhận thì không làm gì cả

        try {
            const response = await axios.delete(
                `http://localhost:3000/api/v1/data/product-delete/${productId}`
            );
            if (response.status === 200) {
                fetchProducts(); // Cập nhật danh sách sản phẩm
                return true;
            }
        } catch (err) {
            error.value = "Không thể xóa sản phẩm";
            console.error(err);
        } finally {
            loading.value = false;
        }
    };

    // cập nhật sản phẩm
    const updateProduct = async (productData) => {
        try {
            const response = await axios.put(
                "http://localhost:3000/api/v1/data/product-update",
                productData
            );
            if (response.status === 200) {
                // Hiển thị thông báo thành công
                const confirm = await Swal.fire({
                    title: "Cập nhật sản phẩm thành công!",
                    icon: "success",
                    showCancelButton: true,
                    confirmButtonText: "Xem danh sách sản phẩm",
                    cancelButtonText: "Đóng",
                });
                if (confirm.isConfirmed) {
                    router.replace("/admin/products-list-manage"); // Chuyển hướng đến danh sách sản phẩm
                }
                return true;
            }
        } catch (err) {
            error.value = "Không thể cập nhật sản phẩm";
            console.error(err);
        } finally {
            loading.value = false;
        }
    };

    return {
        // State
        products,
        product,
        selectedImage,
        components,
        loading,
        error,
        totalProducts,
        // Actions
        fetchProducts,
        fetchProductDataID,
        addProduct,
        deleteProduct,
        updateProduct,
    };
});
