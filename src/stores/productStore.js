import { defineStore } from "pinia";
import axios from "axios";
import { safeParseJSON } from "../utils/utils"; // Import hàm parse JSON

const useProductStore = defineStore("product", {
    state: () => ({
        products: [], // Danh sách sản phẩm
        product: {}, // Sản phẩm đang xem
        selectedImage: "", // Ảnh chính của sản phẩm
        components: [], // Danh sách linh kiện của sản phẩm

        loading: false,
        error: null,
    }),

    actions: {
        // 🟢 Lấy danh sách tất cả sản phẩm
        async fetchProducts() {
            if (this.products.length > 0) return; // Nếu đã có dữ liệu, không gọi lại API

            this.loading = true;
            this.error = null;
            try {
                const response = await axios.get(
                    "http://localhost:3000/api/v1/data/products"
                );
                this.products = response.data;
            } catch (error) {
                this.error = "Không thể tải dữ liệu sản phẩm";
                console.error(error);
            } finally {
                this.loading = false;
            }
        },

        // 🟢 Lấy thông tin sản phẩm theo ID
        async fetchProductDataID(productId) {
            productId = Number(productId); // Ép kiểu để tránh lỗi so sánh

            // 🛑 Nếu sản phẩm đã được load và đúng ID, không gọi API nữa
            if (this.product && this.product.id === productId) return;

            this.loading = true;
            this.error = null;
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
                productData.components = safeParseJSON(
                    productData.components,
                    []
                );

                // ✅ Xác định ảnh chính một cách an toàn
                this.selectedImage =
                    productData.imageDetail?.length > 0
                        ? productData.imageDetail[0]
                        : productData.product_images ||
                          "https://via.placeholder.com/500";

                this.product = productData;
                this.components = productData.components;
            } catch (error) {
                this.error = "Không thể tải sản phẩm";
                console.error(error);
            } finally {
                this.loading = false;
            }
        },
    },
});

export { useProductStore };
