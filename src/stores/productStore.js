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
    const topSellingProducts = ref([]); // Danh sách sản phẩm bán chạy
    const error = ref(null);
    const totalProducts = computed(() => products.value.length);
    // số lượng sản phẩm PC Gaming
    const pcProducts = computed(
        () =>
            products.value.filter(
                (item) =>
                    item.categoryName &&
                    item.categoryName.trim().toLowerCase() === "pc gaming"
            ).length
    );
    const moniterProducts = computed(
        () =>
            products.value.filter(
                (item) =>
                    item.categoryName &&
                    item.categoryName.trim().toLowerCase() ===
                        "màn hình máy tính"
            ).length
    );
    const lapProducts = computed(
        () =>
            products.value.filter(
                (item) =>
                    item.categoryName &&
                    item.categoryName.trim().toLowerCase() ===
                        "laptop văn phòng"
            ).length
    );
    const gameGear = computed(
        () =>
            products.value.filter(
                (item) =>
                    item.categoryName &&
                    item.categoryName.trim().toLowerCase() === "gaming gear"
            ).length
    );
    const pcOfice = computed(
        () =>
            products.value.filter(
                (item) =>
                    item.categoryName &&
                    item.categoryName.trim().toLowerCase() === "pc văn phòng"
            ).length
    );
    const handHeld = computed(
        () =>
            products.value.filter(
                (item) =>
                    item.categoryName &&
                    item.categoryName.trim().toLowerCase() === "pc handheld"
            ).length
    );

    const router = useRouter(); // Khởi tạo router
    const productFavorite = ref([]); // Danh sách sản phẩm yêu thích

    // Danh sách sản phẩm sắp hết hàng
    const outOfStockProducts = computed(() => {
        return products.value.filter((item) => item.stockQuantity <= 10);
    });

    // 🟢 Thêm/xoá sản phẩm yêu thích (toggle từ backend)
    const addFavorite = async (userId, productId) => {
        try {
            const response = await axios.post(
                `http://localhost:3000/api/v1/data/add-favorite`,
                { userId, productId }
            );

            if (response.status === 200) {
                // Gọi lại danh sách sau khi toggle
                await getFavoriteList(userId);
            }
        } catch (err) {
            error.value = "Không thể thêm/xoá yêu thích";
            console.error(err);
        } finally {
            loading.value = false;
        }
    };

    // 🟢 Xóa sản phẩm yêu thích
    const deleteFavorite = async (userId, productId) => {
        const confirm = await Swal.fire({
            title: "Bạn có chắc chắn muốn xóa sản phẩm này khỏi danh sách yêu thích không?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Có, xóa sản phẩm",
            cancelButtonText: "Hủy",
        });

        if (!confirm.isConfirmed) return; // Nếu người dùng không xác nhận thì không làm gì cả

        try {
            const response = await axios.delete(
                `http://localhost:3000/api/v1/data/delete-favorite/${userId}/${productId}`
            );
            if (response.status === 200) {
                // Hiển thị thông báo thành công
                Swal.fire({
                    icon: "success",
                    title: "Thành công",
                    text: "Xóa sản phẩm khỏi danh sách yêu thích thành công",
                    showConfirmButton: false,
                    timer: 1500,
                });

                // Gọi lại danh sách sau khi xóa
                await getFavoriteList(userId);
            }
        } catch (err) {
            error.value = "Không thể xóa yêu thích";
            console.error(err);
        } finally {
            loading.value = false;
        }
    };

    // 🟢 Lấy danh sách yêu thích của người dùng
    const getFavoriteList = async (userId) => {
        try {
            const response = await axios.get(
                `http://localhost:3000/api/v1/data/get-favorite/${userId}`
            );
            if (response.status === 200) {
                productFavorite.value = response.data; // Cập nhật danh sách sản phẩm yêu thích
            }
        } catch (err) {
            error.value = "Không thể lấy danh sách yêu thích";
            console.error(err);
        } finally {
            loading.value = false;
        }
    };

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

            return productData; // ✅ thêm dòng này để trả dữ liệu ra ngoài
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

    // 🟢 Lấy danh sách top 10 sản phẩm bán chạy
    const fetchTopSellingProducts = async () => {
        try {
            const response = await axios.get(
                "http://localhost:3000/api/v1/data/top-selling-products"
            );
            if (response.data.success) {
                topSellingProducts.value = response.data.data;
            }
        } catch (error) {
            console.error("Lỗi lấy sản phẩm bán chạy:", error);
        }
    };

    return {
        // State
        products,
        topSellingProducts,
        product,
        selectedImage,
        components,
        loading,
        error,
        lapProducts,
        gameGear,
        pcOfice,
        handHeld,
        pcProducts,
        totalProducts,
        moniterProducts,
        productFavorite,
        outOfStockProducts,
        // Actions
        fetchProducts,
        fetchProductDataID,
        addProduct,
        deleteProduct,
        updateProduct,
        addFavorite,
        getFavoriteList,
        deleteFavorite,
        fetchTopSellingProducts,
    };
});
